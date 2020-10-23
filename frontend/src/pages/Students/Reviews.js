import React from 'react';
import {useState,setState,useEffect,Component} from 'react';
import './../style/reviews.css';
import $ from 'jquery';
class Review extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/src/pages/JS/reviews.js";
        script.async = true;
        script.onload = () => this.scriptLoaded();
      
        document.body.appendChild(script);
      }
    render(){
        return (
            <div>
                <div class='reviews'>
                    <div class='panel'>
                        <img src='http://www.designbolts.com/wp-content/uploads/2014/01/Superman-Flat-Design.png'></img>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <h7>Superman</h7>
                    </div>
                    <div class='panel'>
                        <img src='http://www.designbolts.com/wp-content/uploads/2014/01/Batman-Flat-Design.png'></img>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <h7>Batman</h7>
                    </div>
                    <div class='panel'>
                        <img src='http://www.designbolts.com/wp-content/uploads/2014/01/Liz-Sherman-Flat-Design.png'></img>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <h7>Liz Sherman</h7>
                    </div>
                </div>
            </div>
        );
    }
}

export default Review;