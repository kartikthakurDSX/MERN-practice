function Dashboard(){
    const username = localStorage.getItem('username');

    return (
        <div className="container-fluid mt-5">
            <h2>Welcome, {username}</h2>
        </div>
    );
}

export default Dashboard;