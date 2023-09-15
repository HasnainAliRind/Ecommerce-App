import React from 'react'
import developer from './developer.png'
function AboutDeveloper() {
    return (
        <div className='AboutDeveloper'>
            <div className='image'>
                <div className='img'>
                    <img src={developer} alt='developer' />
                </div>
            </div>
            <h3>Hi there ! , I'm Hasnain - A Frontend Developer</h3>
            <p>
                I am a highly skilled frontend web developer with a passion for crafting captivating online experiences. With a strong foundation in HTML, CSS, and JavaScript, I have honed my ability to bring design concepts to life, creating visually stunning and responsive websites. I take pride in my attention to detail, ensuring pixel-perfect precision in every project I undertake.
                <br />
                My expertise extends beyond code; I understand the importance of user-centric design and am dedicated to creating websites that are not only visually appealing but also user-friendly and accessible. Collaborative by nature, I thrive in multidisciplinary teams, working closely with designers and backend developers to ensure seamless integration and optimal performance.
                <br />
                With a commitment to staying up-to-date with the latest web technologies and trends, I am always eager to take on new challenges and push the boundaries of what's possible on the web. I am not just a developer; I am a creator of online experiences that leave a lasting impression.
            </p>
            <div className='btns'>
                <button className='github_button'><a href='https://github.com/HasnainAliRind' target='_blank'><i className='fab fa-github'></i>Github Profile</a></button>
                <button className='linkedIn_button'><a href='https://www.linkedin.com/in/hasnain-ali-254482263/?jobid=1234' target='_blank'><i className='fab fa-linkedin'></i>LinkedIn Profile</a></button>
            </div>
        </div>
    )
}

export default AboutDeveloper
