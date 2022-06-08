import React from "react";

function FooterMovie() {
    return(
        <div className="w-full flex flex-col items-center gap-6 px-12 py-24">
            <div className="flex flex-row gap-6 sm:gap-12">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <img src="/assets/images/fa-brands_facebook-square.svg" alt="Icon Facebook"/>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <img src="/assets/images/fa-brands_instagram.svg" alt="Icon Instagram"/>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                    <img src="/assets/images/fa-brands_twitter.svg" alt="Icon Twitter"/>
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                    <img src="/assets/images/fa-brands_youtube.svg" alt="Icon Youtube"/>
                </a>
            </div>
            <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-12">
                <a href="/"><span className="font-bold text-sm text-gray-900">Conditions of Use</span></a>
                <a href="/"><span className="font-bold text-sm text-gray-900">Privacy & Policy</span></a>
                <a href="/"><span className="font-bold text-sm text-gray-900">Press Room</span></a>
            </div>
            <div className="flex flex-row justify-center text-center">
                <span className="font-bold text-sm text-gray-500">© 2022 MovieBase by Shirleen Shohan</span>
            </div>
        </div>
    )
}

export default FooterMovie;