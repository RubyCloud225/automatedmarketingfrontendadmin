import React, { useRef, useState, useContext } from 'react';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { ApiContext } from './ApiContext';

const NewsletterEditor = () => {
    const { createNewsletter, generateNewsletter, loading} = useContext(ApiContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [prompt, setPrompt] = useState('');
    const componentRef = useRef(null);

    const handleGenerate = async (e) => {
        e.preventDefault();
        try {
            const generatedContent = await generateNewsletter(prompt);
            setContent(generatedContent);
            setMessage('Newsletter generated successfully!');
        } catch (err) {
            setMessage('Error generating newsletter:' + err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createNewsletter(title, content);
            setMessage('Newsletter created successfully!', response.title);
            // Clear the form
            setTitle('');
            setContent('');
        } catch (error) {
            setMessage('Error creating newsletter: ' + error.message);
        }
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text("Title: '{title}'", 10, 10);
        doc.text("Content: '{content}'", 10, 20);
        doc.save("newsletter'{newsletterId}'.pdf");
    };

    return (
        <div>
            <h2>Edit Newsletter</h2>
            <form onSubmit={handleGenerate}>
                <div>
                    <label>Prompt for Newsletter</label>
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Generating ...' : 'Generate Newsletter'}</button>
            </form>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <button type="submit">Publish Newsletter</button>
            </form>
            {message && <p>{message}</p>}
            <div style={{ display: 'none' }}>
                <div ref={componentRef}><h2>{title}</h2><p>{content}</p></div>
            </div>
            <ReactToPrint trigger={() => <button>Print</button>} content={() => componentRef.current} />
            <button onClick={handleGeneratePDF}>Save as PDF</button>
        </div>
    );
};

export default NewsletterEditor;