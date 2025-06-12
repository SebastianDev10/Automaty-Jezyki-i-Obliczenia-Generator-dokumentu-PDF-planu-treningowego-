import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './TrainingPlans.css';

function TrainingPlans() {
    const [trainingPlan, setTrainingPlan] = useState('');
    const [file, setFile] = useState(null);
    const [planType, setPlanType] = useState('beginner');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('plan_type', planType);

        const token = localStorage.getItem('access_token');
        await fetch('http://localhost:8000/upload-training-plan/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Plan uploaded successfully!');
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Upload failed');
        });
    };

    const fetchTrainingPlan = async (planType) => {
        const token = localStorage.getItem('access_token');
        await fetch(`http://localhost:8000/training-plans/${planType}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setTrainingPlan(data.plan);
        })
        .catch(error => {
            console.error('Error fetching training plan:', error);
            setTrainingPlan('Error loading the training plan.');
        });
    };

    const downloadPDF = async (planType) => {
        const token = localStorage.getItem('access_token');
        const url = `http://localhost:8000/training-plans-pdf/${planType}/`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${planType}_training_plan.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    };

    return (
        <div className="training-plans-container">
            <aside className="sidebar">
                <button onClick={handleLogout} className="logout-button">
                    <FontAwesomeIcon icon={faRightFromBracket} /><span className="button-text"> Wyloguj</span>
                </button>
            </aside>
            <main className="main-content">
                <div className="buttons-container">
                    <button onClick={() => fetchTrainingPlan('beginner')}>Początkujący</button>
                    <button onClick={() => fetchTrainingPlan('intermediate')}>Średniozaawansowany</button>
                    <button onClick={() => fetchTrainingPlan('advanced')}>Zaawansowany</button>
                    <button onClick={() => downloadPDF('beginner')}>Pobierz PDF dla początkujących</button>
                    <button onClick={() => downloadPDF('intermediate')}>Pobierz PDF dla średniozaawansowanych</button>
                    <button onClick={() => downloadPDF('advanced')}>Pobierz PDF dla zaawansowanych</button>
                </div>
                <div className="plan-container">
                    {trainingPlan ? <pre>{trainingPlan}</pre> : <p>Wybierz plan treningowy, aby wyświetlić.</p>}
                </div>
                <div className="upload-container">
                    <input type="file" onChange={handleFileChange} />
                    <select onChange={(e) => setPlanType(e.target.value)} value={planType}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <button onClick={handleUpload}>Upload Plan</button>
                </div>
            </main>
        </div>
    );
}

export default TrainingPlans;
