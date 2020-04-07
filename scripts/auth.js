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
            console.log(cred.user);
            M.Modal.getInstance(document.querySelector('#modal-signup')).close();
            signupForm.reset();
        }).catch();
});