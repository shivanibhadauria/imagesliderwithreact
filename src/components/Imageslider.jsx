import { useEffect, useState } from "react";
import './Imageslider.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";




export default function Imageslider({ limit, page }) {
    const [slide, setSlide] = useState("0")
    const [image, setImage] = useState([])

    async function fetchApi() {
        let data = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        let res = await data.json();
        setImage(res);
    }
    console.log(image)


    useEffect(() => {
        fetchApi();
    }, [])

    function handNext() {
        setSlide(slide == image.length - 1 ? 0 : slide + 1)
    }

    function handlePrevious() {
        setSlide(slide == 0 ? image.length - 1 : slide - 1)
    }





    return (<body>



        {

            image && image.length ?
                image.map((item, index) => {
                    return <>

                        <img alt="photosss" key={item.id} className={slide == index ?
                         "img" : "img img-hide"} src={item.download_url
                        } ></img>

                    </>
                }) : null

        }
        <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow right" />

        <BsArrowRightCircleFill onClick={ handNext} className="arrow left" />


        <span className="circle">

            {
                image && image.length ?
                    image.map((_, i) => (
                        <button key={i} className={slide == i ? "current-indicator" : "current-indicator inactive-indicator"} onClick={() => setSlide(i)}></button>
                    ))


                    : null
            }
        </span>









    </body>)
}