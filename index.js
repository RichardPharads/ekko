import ollama from "ollama";
import fs, { readFileSync, writeFile, writeFileSync } from 'fs'



const format = readFileSync('./Format.txt' , 'utf-8')

const chatModel = async (message) => {
    const res = await ollama.chat({
        model: 'devin',
        messages: [{role: 'system', content: format },{role:'user', content: message}]
    })
    try {
        
        const json = JSON.parse(res.message.content)
        return json
    } catch (error) {
        console.error(error)
    }
}

const data = await chatModel('Here is the Description , Create an html portfolio with inline style of css , and add the name of Jenelyn Candido in the website name')
console.log(data)

const createCode = async (description , language , requirements) => {
    const res = await ollama.chat({
        model: 'gemma3:4b',
        messages: [
            {role:'system', content: 'You are software engineer. You are Good at Coding with HTML, You only response with this format {"code":" Code Goes Here "}'} , 
            {role:'user', content: `You must Create Code with this Description ${description} , and using this programming language ${language} and here is the list of requirements \n ${requirements.map(item=>{item})}`}
        ]
    })
    try {
        console.log(res.message.content)
        const json = JSON.parse(res.message.content)
        console.log("Reading Data and Creating Code")
        return json
    } catch (error) {
        console.log(error)
    }
}

const code = await createCode(data.description , data.language , data.requirements)


const makingCode = async () => {
    try {
        console.log("Starting to write Code")
        writeFileSync(`resume.${data.language}` , `${code.code}` , "utf-8")
    } catch (error) {
        console.log(error)
    } 
}

makingCode()


