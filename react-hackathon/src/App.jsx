import  Nav from './components/Nav/Nav.jsx'
import Home from './components/Home/Home.jsx'
import './App.css'
import SecondPagetitle from './components/SecondPage/SecondPagetitle.jsx'
import Card from './components/Card/Card.jsx'
import Badges from './components/Badges/Badges.jsx'
import Badgedetails from './components/SecondPage/Badgesdetails.jsx'
import User from './components/User/User.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  let arr = [
    {
      image:"./CardImages/DC.jpeg",
      title:"Charminar",
      desc:"This is a good place called charminar"
    },
    {
      image:"./CardImages/man.png",
      title:"TankBund",
      desc:"This is a good place called tank bund"
    },
    {
      image:"./CardImages/river.png",
      title:"Golconda",
      desc:"This is a good place called golconda"
    },
    {
      image:"./CardImages/woman.png",
      title:"city Mall",
      desc:"This is a good place called city mall"
    },
  ];
  let badges = [
    {
      image:"/BadgeImages/pyramid.png",
      title:"Beginner",
      
    },
    {
      image:"/BadgeImages/tower.png",
      title:"Intermediate",
    },
    {
      image:"/BadgeImages/build.png",
      title:"Proficient",
    },
    {
      image:"/BadgeImages/mountain.png",
      title:"Expert",
    },
    {
      image:"/BadgeImages/desert.png",
      title:"God-level expert"
      
    }
   
  ];
  return (
    <>
    <Nav></Nav>
    <div style={{padding : "3rem"}}>
    <Home></Home>
    </div><br /><br /><br /><br /><br />
    <hr />
     <Badgedetails/>
    <div style={{display:"flex",flexWrap:"wrap",gap:"3rem",justifyContent:"center",paddingBottom:"20vh"}}>
      {
        badges.map((value,index)=>{
         return  <Badges key={index} data={value}/>
        })
      }
      </div>
    <hr />
    <User/>
    <hr />
    <SecondPagetitle/>
    
    <div style={{display:"flex",flexWrap:"wrap",gap:"3rem",justifyContent:"center",paddingBottom:"20vh"}}>
      {
        arr.map((value,index)=>{
         return  <Card key={index} data={value}/>
        })
      }
      </div>
      <hr />
   <Footer></Footer>
    </>
  )
}

export default App
