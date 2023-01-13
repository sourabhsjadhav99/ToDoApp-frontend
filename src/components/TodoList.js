import { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import axios from 'axios';
import "../App.css"

export default function FormPage() {

    const [text, setText] = useState("");
    let [fetchedData, setFetchedData] = useState([])
    const [update, setUpdate] = useState(false);
    let [updateText, setUpdateText] = useState("")
    let [updateId, setUpdateId] = useState("")

    const handleChange = (event) => {
        const value = event.target.value;
        setText(value)
    }
    //get data
    const getData = () => {
        axios.get(`https://todo-backend-1ss2.onrender.com/product`).
            then((data) => {
                setFetchedData(data.data.data)
            })
    };
    useEffect(() => {
        getData()
    }, []);
    //post data
    const submitForm = (e) => {
        e.preventDefault()
        if (text) {
            axios.post('https://todo-backend-1ss2.onrender.com/product', {
                text: text,
            })
                .then(function (response) {
                    getData()
                    setText("")

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Field must not be empty")
        }
    }

    //edit data
    const handleEdit = (_id, text) => {
        setUpdate(true)
        setUpdateId(_id)
        setUpdateText(text)

    }
    let putData = (id, text) => {
        axios.put(`https://todo-backend-1ss2.onrender.com/product/${id}`, { text: text })
            .then((res) => {
                setUpdate(false)
                getData();

            })
            .catch((err) => console.log(err));
    }

    //delete Data
    function handleDelete(_id) {
        axios
            .delete(`https://todo-backend-1ss2.onrender.com/product/${_id}`)
            .then(() => {
                getData()
            });
    }
    return (
        <div id="main-container">
            <h1>To Do List App</h1>
            <div>
                <form className="create-container" onSubmit={submitForm}>
                    <input placeholder="Add Text"
                        className="input-boxing"
                        type="text"
                        name="text"
                        value={text}
                        onChange={handleChange}
                    />
                    <button type="submit" className="add-btn " > Add</button>
                </form>
            </div>
            {update ? <div className='edit-container'><input className='edit-input' type="text"
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}

            />
                <button className='edit-btn' onClick={() => putData(updateId, updateText)}>Edit</button></div> : ""}
            <div className='todo-container'>
                {fetchedData.map((data, index) => {
                    return <div className='todo-list' key={data._id}>
                        <div>{data.text}</div>
                        <div>
                            <button className='icon edit-icon' onClick={() => { handleEdit(data._id, data.text) }}><BiEdit /></button>
                            <button className='icon ' onClick={() => { handleDelete(data._id) }}><AiFillDelete /></button>
                        </div>
                    </div>
                })}
            </div>

        </div>

    )
}