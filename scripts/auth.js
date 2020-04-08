// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', e => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail}).then(result => {
        console.log(result);
        adminForm.reset();
    });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        // get data
        // TODO unsub on logout
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);            
        }, err => console.log(err));
    }else{
        setupGuides([]);
        setupUI();
    }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        M.Modal.getInstance(document.querySelector('#modal-create')).close();
        createForm.reset();
    }).catch(err => console.log(err));
    

});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    // TODO validate user info
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                bio: signupForm['signup-bio'].value
            });
        }).then(() => {
            M.Modal.getInstance(document.querySelector('#modal-signup')).close();
            signupForm.reset();
            signupForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            signupForm.querySelector('.error').innerHTML = err.message;
        });    
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            M.Modal.getInstance(document.querySelector('#modal-login')).close();
            loginForm.reset();
            loginForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            loginForm.querySelector('.error').innerHTML = err.message;
        });
});