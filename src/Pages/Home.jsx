import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Home() {
    const [modelUrl, setModelUrl] = useState('');
    const [modelName, setModelName] = useState('');
    const [createdLink, setCreatedLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [allModels, setAllModels] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();



    useEffect(() => {

        const fetchModel = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/all-models`);
                setAllModels(res?.data)
            } catch (error) {
                console.error("Error fetching all model:", error);
            }
        };

        fetchModel();
    }, []);


    console.log(allModels)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/file-upload`, {
                url: modelUrl,
                name: modelName
            });

            console.log('Upload successful:', response.data);
            if (response?.data.id) {
                setCreatedLink(`https://superb-dodol-95b8a7.netlify.app/3d-model/${response?.data.id}`)
            }
            if (response?.data.model) {
                console.log(response?.data.model)
            }
        } catch (err) {
            console.error('Upload failed:', err);
            setError(err.response?.data?.error || 'Failed to upload model');
        } finally {
            setIsLoading(false);
        }
    };

    const handleModelChange = (e) => {
        const selectedId = e.target.value;
        setCreatedLink(`https://superb-dodol-95b8a7.netlify.app/3d-model/${selectedId}`)

    };

    return (

        <div>
            {createdLink ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1 style={{ margin: 0 }}>{createdLink}</h1>
                    <CopyToClipboard
                        text={createdLink}
                        onCopy={() => {
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000); 
                        }}
                    >
                        <button style={{
                            padding: '5px 10px',
                            background: isCopied ? '#4CAF50' : '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            {isCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </CopyToClipboard>
                </div>
            ) : <div>
                <h1>Add your 3D GLB file URL</h1>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input className='input'
                        type="url"
                        name="url"
                        value={modelUrl}
                        onChange={(e) => setModelUrl(e.target.value)}
                        required
                        placeholder="Enter GLB file URL"
                    />

                    <input className='input'
                        type='text'
                        name='model-name'
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        required
                        placeholder='Add a Name of your model'
                    />

                    <p>Show your previous model</p>
                    <select className='select'
                        // value={selectedModel}
                        onChange={handleModelChange}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            width: '100%',
                            marginBottom: '20px'
                        }}
                    >
                        <option value="">-- Select a Model --</option>
                        {allModels.map((model) => (
                            <option key={model._id} value={model._id}>
                                {model.name}
                            </option>
                        ))}
                    </select>


                    <button className='input' type="submit" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Submit'}
                    </button>
                </form>
            </div>}


        </div>
    );
}