const input = document.getElementById("msg_send");
const apiKey = "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";

function init() {
    let res_elm = document.createElement("div");
    //res_elm.innerHTML="Hello Myself Aco, How can I help you?" ;

    res_elm.innerHTML= "Hello there, How can I help you?";


    res_elm.setAttribute("class","left");
 
    document.getElementById('msg').appendChild(res_elm);

}
 
 
document.getElementById('reply').addEventListener("click", async (e) => {
    e.preventDefault();
    const mytext = input.value.trim();
    input.value = '';
 
    var req = mytext ;
 
    if (req == undefined || req== "") {
 
    }
    else{
     
        let data_req = document.createElement('div');
        let container1 = document.createElement('div');
        container1.setAttribute("class","msgCon1");
        data_req.innerHTML = req ;
        data_req.setAttribute("class","right");
        let message = document.getElementById('msg');
        message.appendChild(container1);
        container1.appendChild(data_req);




        var res = "";
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: mytext }],
                temperature: 1.0,
                top_p: 0.7,
                max_tokens: 150,
                n: 1,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 0,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            //res = JSON.stringify(data.choices[0].message.content)
            res = JSON.stringify(data.choices[0].message.content);
            res = res.replace(/\\n/g, '<br>');

            const lastPeriodIndex = res.lastIndexOf('.');
            if (lastPeriodIndex !== -1) {
                res = res.substring(0, lastPeriodIndex + 1); // Extract the substring up to the last full stop (including the full stop)
            }
        } else {
            messages1.value = 'Error: Unable to process your request.';
        }
           
        
        let data_res = document.createElement('div');
 
       
        let container2 = document.createElement('div');
 
        
        container2.setAttribute("class","msgCon2");
 
        
        data_res.innerHTML = res ;
 
 
        
        data_res.setAttribute("class","left");
 
        
 
         
        
        message.appendChild(container2);
 
        
        container2.appendChild(data_res);
 
        document.getElementById('msg_send').value = "";
 
        function scroll() {
            var scrollMsg = document.getElementById('msg')
            scrollMsg.scrollTop = scrollMsg.scrollHeight ;
        }
        scroll();
 
    }
 
});