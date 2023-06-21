import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const signup = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Password and Confirm Password do not match!');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            {error && <p className="error">{error}</p>}
            <input
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={signup}>Sign Up</button>
            <Link to="/signup">Already have an account? Sign in here!</Link>
        </>
    );
};

export default SignupPage;
