import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';

const FloatingPanel = () => {
    
    const[visible, setVisible] = useState(false);

    const handleMouseMove = (e) => {
       if(e.clientX < 20){
        setVisible(true);
       } else if(e.clientX > 100){
        setVisible(false);
       }
    };

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        history.push('/');
    };

    useEffect(()=>{
        document.addEventListener('mousemove',handleMouseMove);

        return () => {
            document.removeEventListener('mousemove',handleMouseMove);
        };
    },[]);

    return (
        <>
           <div 
              style={{ 
                position: 'fixed',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
                width: '10px',
                height: '80px',
                zIndex: 999,
                backgroundColor: 'black',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
                cursor: 'pointer'}} />
           {visible && (
            <div className="card shadow p-2"
                 style={{ 
                    position: 'fixed',
                    top: '50%',
                    left: '0',
                    transform: 'translateY(-50%)',
                    width: '150px',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    borderRadius: '0 8px 8px 0',
                    transition: 'all 0.3s ease'
                  }}>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><a href="/employees">🏠 Home</a></li>
                        <li className="list-group-item"><a href="/profile">👤 Profile,</a></li>
                        <li className="list-group-item"><a href="/settings">⚙️ Settings</a></li>
                        <li className="list-group-item" onClick={handleLogout}><a>🚪 Logout</a></li>
                    </ul>
            </div>
           )}
        </>
    );

};

export default FloatingPanel;