componentDidMount(){
    Promise.all([
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent'),
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    ])
    .then(([res1, res2]) => [res1.json(), res2.json()])
    .then(([data1, data2]) => this.setState({
        recentInfo: data1, 
        alltimeInfo: data2
    }));
}


componentDidMount(){
    Promise.all([
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent'),
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1, data2]) => this.setState({
        recentInfo: data1, 
        alltimeInfo: data2
    }));
}