import React, { useEffect, useState } from 'react';

export default function SearchForm({ searchWordCallBack, searchTypeCallBack }) {

    const [word, setWord] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [image, setImage] = useState(true);
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);

    useEffect(() => {
        setMediaType(`${image === true?'image':''},${video === true?'video':''},${audio === true?'audio':''}`);
    }, [image, video, audio]);

    return (

        <div className='w-50 mx-auto '>
            <form onSubmit={(event) => { event.preventDefault(); searchWordCallBack(word); searchTypeCallBack(mediaType); }}>
                <div className='input-group'>
                    <input className='form-control' type="text" onChange={(event) => setWord(event.target.value)} placeholder='Saerch...' />
                    <button className='btn btn-info' type='submit'>Search</button>
                </div>
                <div className='input-group'>
                    <div className='m-2 text-white border rounded'>
                        <label className="form-check-label p-2" htmlFor="images">Images</label>
                        <input className="form-check-input p-3" type="checkbox" checked={image} onChange={(e) => setImage(e.target.checked)} name="images" />
                    </div>
                    <div className='m-2 text-white border rounded'>
                        <label className="form-check-label p-2" htmlFor="videos">Videos</label>
                        <input className="form-check-input p-3" type="checkbox" onChange={(e) => setVideo(e.target.checked)} name="video" />
                    </div>
                    <div className='m-2 text-white border rounded'>
                        <label className="form-check-label p-2" htmlFor="audio">Audio</label>
                        <input className="form-check-input p-3" type="checkbox" onChange={(e) => setAudio(e.target.checked)} name="audio" />
                    </div>
                </div>
            </form>

        </div>
    );
}