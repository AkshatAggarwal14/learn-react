import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SigninPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const signin = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <h1>Sign In</h1>
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
            <button onClick={signin}>Sign In</button>
            <Link to="/signup">Don't have an account? Create one here!</Link>
        </>
    );
};

export default SigninPage;
