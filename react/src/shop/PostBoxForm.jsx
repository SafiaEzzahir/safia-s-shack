import { useState } from 'react';

function PostBoxForm() {
    const [result, setResult] = useState('');

    const [NameInput, setNameInput] = useState('');
    const [EmailInput, setEmailInput] = useState('');
    const [MessageInput, setMessageInput] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('access_key', '9e10d1b2-0429-46a9-a310-a2026f524116');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            setResult("success! i'll get to your message soon =)");
            setNameInput('');
            setEmailInput('');
            setMessageInput('');
        } else {
            setResult("error =( you might need to try again")
        };
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name='name' value={NameInput} onChange={(e) => setNameInput(e.target.value)} placeholder='your name ;)' required/>
            <input type="email" name='email' value={EmailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder='your.email@example.com' required/>
            <textarea name="message" value={MessageInput} onChange={(e) => setMessageInput(e.target.value)} required></textarea>
            <button type='submit'>submit</button>
            <p>{result}</p>
        </form>
    );
}

export default PostBoxForm;