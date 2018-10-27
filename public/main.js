const form=document.getElementById('form1');

fetch('http://localhost:3000/poll').then(res => res.json())
    .then(data => {
        const votes=data.votes;
        let totalVotes=votes.length;

        //counting each vote
        const voteCounts=votes.reduce((acc,vote) => ((acc[vote.os] = (acc[vote.os] || 0 ) + parseInt(vote.points)),acc),{});

        let dataPoints=[
            {label:'Windows',y:voteCounts.Windows},
            {label:'MacOS',y:voteCounts.MacOS},
            {label:'Linux',y:voteCounts.Linux},
            {label:'Others',y:voteCounts.Others}
        ];
        
        const chartContainer=document.getElementById('chart');
        if(chartContainer){
            var  chart =  new  CanvasJS.Chart("chart",
        {
          animationEnabled:true,
          theme:'theme1',
          title:{
              text:`OS Results`
          }  ,
          data:[ 
          {// dataSeries 1
           type: "column",
           dataPoints:dataPoints
          }
        ]
        }) 
         
        chart.render();
        
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
        
        var pusher = new Pusher('78671611f2da4f3fd5b5', {
          cluster: 'ap2',
          forceTLS: true
        });
        
        var channel = pusher.subscribe('os-poll');
        channel.bind('os-vote', function(data) {
          dataPoints = dataPoints.map(x=>{
              if(x.label==data.os){
                  x.y += data.points;
                  return x;
              }
              else{
                  return x;
              }
          });
          chart.render();
        });
        
        }

    })

form.addEventListener('submit',(e)=>{
    const choice=document.querySelector("input[name=os]:checked").value;
    const data={os:choice};
    fetch('http://localhost:3000/poll',{
        method:'post',
        body:JSON.stringify(data),
        headers:new Headers(
            {
                'Content-Type':'application/json'
            }
        )
    }).then(res => res.json())
        .then(data=>console.log(data)
        )
        .catch(err=>console.log(err)
        );


    e.preventDefault();
})

