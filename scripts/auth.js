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
    auth.signOut().then(() => console.log('user logged out')).catch(err => console.log(err));
});