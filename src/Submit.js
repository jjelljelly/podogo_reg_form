import { useState, useRef } from "react";
import Loading from './Loading';
import SignatureCanvas from 'react-signature-canvas';
import HSMC from './downloads/Harley Street Medical Centre Privacy Policy.pdf';
import $ from "jquery";

let Submit = ({
    fields,
    updateFields,
    reRender
}) => {
    const sigPad = useRef({});
    const [loading, setLoading] = useState(false);

    const onClick = (e) => {
        e.preventDefault()
        const empty = sigPad.current._sigPad._isEmpty;

        //form validation
        if (empty) document.getElementById("signature").style.border = "3px solid red";

        if (!empty) postData()
    }

    const postData = () => {
        //toggle loading icon while submitting data to web app
        setLoading(true);

        //update date of birth field to correct format
        const date = new Date(fields.date_of_birth);

        //attach signature image to payload
        const payload = {
            ...fields,
            signature: sigPad.current.getSignaturePad().toDataURL('image/png'),
            dob_formatted: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
        }

        $.post(process.env.REACT_APP_SUBMIT,
            payload,
            (res) => {
                console.log(res);
                reRender('complete')
            }
        );
    }

    return (
        <>
        <div className="reg-border">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeYAAACHCAYAAADDTPqEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ1M0VDNzdBNTdCMTExRTlCMTExRDFFNEJDNDFDNTIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1M0VDNzc5NTdCMTExRTlCMTExRDFFNEJDNDFDNTIzIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIElsbHVzdHJhdG9yIENTNS4xIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDA4MDExNzQwNzIwNjgxMTg4QzZEREM1MjE4RTg2OEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDA4MDExNzQwNzIwNjgx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" alt="Logo" className="podogo-logo" />
        <h1>Registration Form</h1>
        <hr />
        <div className="privacy-statement">
        <h3 className="privacy-title">Privacy Statement</h3>
            Your Personal Data (Name, Date or Birth, Preferred Correspondence, Contact details and Medical Information and other identifying information) will be used to provide our healthcare service to you and processed in accordance with the following privacy policies:
            <br />
            <br />
            <ul style={{textAlign: 'left'}}>
                <li><a href="https://www.podogo.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Podogo - Privacy Statement</a></li>
                <li><a href={HSMC} target="_blank" rel="noopener noreferrer">Harley Street Medical Centre - Privacy Statement</a></li>
            </ul>
            <br />
            For more information on how we process your data contact our team who would be happy to provide further details. 
            <br />
            <br />
            <ul style={{textAlign: 'left'}}>
                <li>Tel: <a href="tel:+442078208007">+44 207 412 8882</a><br /></li>
                <li>Email: <a href="mailto: admin@podogo.com">admin@podogo.com</a></li>
            </ul>
        </div>

        <form className="reg-form pm-margin" onSubmit={(e) => onClick(e)}>
            <label>
            By checking this box you confirm that you have read and agree with the London Foot & Ankle Surgery and Harley Street Medical Centre’s Privacy Statements and that the personal information you provide will be processed in accordance with these. <br />
                <div id="privacy">
                    <input 
                        className="pm-checkbox" 
                        type="checkbox" 
                        checked={fields.privacy || false} 
                        name="privacy" 
                        onChange={e => updateFields('privacy', !fields.privacy)} 
                        required
                        />
                        I AGREE
                    <div className="required-label">*required</div>
                </div>
            </label>

            <label>
                We would like to send you information by email about our own products and services. If you agree to being contacted in this way, please tick the 'Yes' box below.<br />
                <div id="marketing">
                    <input className="pm-checkbox" type="checkbox" checked={fields.marketing || false} name="marketing" onChange={e => updateFields('marketing', !fields.marketing)} />YES
                </div>
            </label>

            <hr />
            <div 
                className='signature-container'
                style={{textAlign: 'center'}}
                >
                <div className="required-label">*required</div>
                <div style={{width: '100%', textAlign: 'left', margin: '20px 0'}}>
                    PLEASE SIGN
                    <p>You can use your mouse or your finger if you have a touch screen.</p>
                </div>
                <SignatureCanvas 
                    penColor='#20365F'
                    clearOnResize={false}
                    canvasProps={{id: "signature", className: 'sigCanvas', style: {width: '98%', height: 140, border: '2px solid #20365F'}}}
                    backgroundColor='rgba(255, 255, 255, 0.8)'
                    ref={(ref) => sigPad.current = ref}
                    />
                <button 
                    style={{marginBottom: 0, width: '100%'}}
                    onClick={(e) => {
                        e.preventDefault()
                        sigPad.current.clear()
                    }}>
                        clear signature
                </button>
            </div>
            <hr />
            <input type="submit" value="Submit" />
        </form>
        </div>

        {
            loading && <Loading />
        }
        </>
    )
}

export default Submit;