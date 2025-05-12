function Dashboard(){
    const username = localStorage.getItem('username');

    return (
        <div>
            <h2>Welcome, {username}</h2>
        </div>
    );
}

export default Dashboard;