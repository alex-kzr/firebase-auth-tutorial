// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user){
        // get data
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupNav(user);
        });
    }else{
        setupGuides([]);
        setupNav(user);
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
            M.Modal.getInstance(document.querySelector('#modal-signup')).close();
            signupForm.reset();
        }).catch(err => console.log(err));
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
        });
});