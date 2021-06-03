//rfce
import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';

//const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key:1, value:'Africa'},
    {key:2, value:'Europe'},
    {key:3, value:'Asia'},
    {key:4, value:'North America'},
    {key:5, value:'South America'},
    {key:6, value:'Australia'},
    {key:7, value:'Antarctica'},
]

function UploadProductPage(props) {
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [Continent, setContinent] = useState(1);    
    const [Images, setImages] = useState([]);

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    }

    const DescriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    }

    const PriceChangeHandler = (e) => {
        setPrice(e.currentTarget.value);
    }

    const ContinentChangeHandler = (e) => {
        setContinent(e.currentTarget.value);
    }

    const updateImages = (newImages) => {
        console.log(newImages);
        setImages(newImages);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(!Title || !Description || !Price || !Continent || !Images) {
            return alert('모든 항목이 입력되어야 합니다.');
        }

        const body = {
            //로그인 사용자ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent,
        };

        axios.post('/api/product', body)
            .then(response => {
                if(response.data.success) {
                    alert('업로드 성공');
                    props.history.push('/');
                } else {
                    alert('업로드 실패');
                }
            });
   }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>여행 상품 업로드</h2> 
            </div>
            
            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={DescriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격</label>
                <Input onChange={PriceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={ContinentChangeHandler} value={Continent}> 
                    {Continents.map(item => (
                        <option key={item.key} value={item.value}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" htmlType="submit">
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage;