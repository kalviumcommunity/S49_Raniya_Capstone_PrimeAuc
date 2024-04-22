import React from 'react'
import sellbackground from  '../assets/images/sellbackground.jpg';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function Sell() {
  return (
    <div>
      <div className="image" style={{ backgroundImage: `url(${sellbackground})` }}>
        <h1 className="header1">SELL AT LOXERA, WHERE OPPORTUNITIES MEET ENTHUSIASTS!</h1>
      </div>   
<div>

<div className="grid-container">
  <div className="grid-item left-content">
    {/* <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt="img"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box> */}
  </div>
  <div className="grid-item right-content">
    <h3>Whether you're a seasoned seller or a newcomer to the world of online auctions, our platform offers you the perfect stage to showcase your treasures and connect with eager buyers from around the globe. Set your desired prices, and engage in dynamic bidding wars that drive excitement and value. Join our vibrant community of sellers today and unlock the potential to turn your items into cash while delighting buyers with unique finds.</h3>
  </div>
</div>



    </div>



    <div class="row align-items-md-stretch">
  <div class="col-md-6">
    <div class="h-100 p-5 text-bg-danger rounded-3">
      <h2>Change the background</h2>
      <p>Swap the background-color utility and add a <code>.text-*</code> color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
      <button class="btn btn-outline-light" type="button">Example button</button>
    </div>
  </div>
  <div class="col-md-6">
    <div class="h-100 p-5 bg-body-tertiary border rounded-3">
      <h2>Add borders</h2>
      <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
      <button class="btn btn-outline-secondary" type="button">Example button</button>
    </div>
  </div>
</div>
<div class="row align-items-md-stretch">
  <div class="col-md-6">
    <div class="h-100 p-5 text-bg-light rounded-3">
      <h2>Change the background</h2>
      <p>Swap the background-color utility and add a <code>.text-*</code> color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
      <button class="btn btn-outline-light" type="button">Example button</button>
    </div>
  </div>
  <div class="col-md-6">
    <div class="h-100 p-5 bg-danger border rounded-3">
      <h2>Add borders</h2>
      <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
      <button class="btn btn-outline-secondary" type="button">Example button</button>
    </div>
  </div>
</div>

<div class="row align-items-md-stretch">
  <div class="col-md-6">
    <div class="h-100 p-5 text-bg-danger rounded-3">
      <h2>Change the background</h2>
      <p>Swap the background-color utility and add a <code>.text-*</code> color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
      <button class="btn btn-outline-light" type="button">Example button</button>
    </div>
  </div>
  <div class="col-md-6">
    <div class="h-100 p-5 bg-body-tertiary border rounded-3">
      <h2>Add borders</h2>
      <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
      <button class="btn btn-outline-secondary" type="button">Example button</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Sell




const itemData = [
  
 
   
  {
    img: 'https://i.pinimg.com/474x/51/c7/fe/51c7fe8678e1ce7d75d9ae3de34e2c97.jpg',
    title: 'white statue',
  },
  


  {
    img: 'https://i.pinimg.com/474x/24/d2/5f/24d25f359e7a2722881c7f2e55e9d9e0.jpg',
    title: 'red card',
  },
  {
    img: 'https://i.pinimg.com/474x/a9/b6/d4/a9b6d45d2a4d69289f81b4ab10549125.jpg',
    title: 'angel statue',
  },
  {
    img: 'https://i.pinimg.com/474x/0a/fb/53/0afb5388823a577cca07e35746cf874c.jpg',
    title: 'vatican egg',
  },
  {
    img: 'https://i.pinimg.com/474x/b0/b6/cb/b0b6cbcdb3f57a213a1a11905ee72849.jpg',
    title: 'golden painting',
  },
  {
    img: 'https://i.pinimg.com/474x/23/ab/91/23ab9145e7ce053568bd3b318f974c43.jpg',
    title: 'sunset painting',
  },

  {
    img: '  https://i.pinimg.com/474x/93/a9/83/93a983623edf70e57678fbac34f0686c.jpg',
    title: 'ring',
  },

  {
    img:'https://i.pinimg.com/474x/b9/46/c0/b946c0557ba73571925d2ce0d5e6462b.jpg',
    title:'glass bottle'
  },
  {
    img:'https://i.pinimg.com/474x/db/bd/12/dbbd12772f3ce5bd157c8d60bb2c50eb.jpg',
    title:'hand painting'
  }

];
