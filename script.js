const api_Url ="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDtRIMb2BudKaeH3jXbCo0ChJCVUJGA_dk"
const prompt = document.querySelector('#prompt-input')
const chatContainer = document.querySelector('.chat-container')
const imgBtn = document.querySelector('#img-btn')
const header = document.querySelector('header')
const send = document.querySelector('.send')


let user = {
    data : null
}

async function generateResponse(aiChatBox) {


    let aiText =aiChatBox.querySelector('.ai-chat-div')

    let requestOption = {
        method : "POST",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({

            "contents":[{

                "parts":[{"text": user.data}]
            }]
        })
    }

   try{
    let response = await fetch(api_Url, requestOption)
    let data = await response.json();

    const aiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()

    aiText.innerHTML = aiResponse

   }
   catch(err){
    console.log(error)
   }
   finally{
    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
   }
} 

function createChatBox(html, classes){
    let div = document.createElement('div')
    div.innerHTML=html
    div.classList.add(classes)
    return div
}


function handleChatResponse(message){
    user.data = message
     let html = `<img src="Assets/img/user.png" alt="">
            <div class="user-chat-div">
            ${user.data}
            </div>`
            prompt.value=""
            let userChatBox = createChatBox(html,"user-chat")
            chatContainer.appendChild(userChatBox)

            chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"});

            
            setTimeout(()=>{
                let html = ` <img src="Assets/img/bot.png" alt="">
            <div class="ai-chat-div">
             <div class="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>`
            let aiChatBox = createChatBox(html, "ai-chat")
            chatContainer.appendChild(aiChatBox)
            generateResponse(aiChatBox)
            chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"});

            },600)
}





prompt.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
      handleChatResponse(prompt.value)
      header.style.display="none"
    }
})
send.addEventListener('click',()=>{
    
      handleChatResponse(prompt.value)
      header.style.display="none"
    
})


imgBtn.addEventListener('click',()=>{
imgBtn.querySelector('input')
})


