import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../../styles/CSS/card.css';

export default function MediaCard(props) {
  // التحقق من وجود البيانات
  if (!props.image || !props.title) {
    return <div>Missing data</div>; // رسالة خطأ يمكن تخصيصها حسب الحاجة
  }

  return (
    <Card 
      className="card" 
      sx={{ 
        maxWidth: 270, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        position: 'relative', 
        backgroundColor: '#e2e2cf' 
      }}
    >
      <CardMedia 
        className='card-image'
        sx={{ height: 180, width: '100%' }}  
        image={props.image}
        title={props.title}
      >
        {props.children && props.children.length > 0 ? props.children[0] : null}  {/* Render Favorite Icon if available */}
      </CardMedia>
      <CardContent className="card-content">
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
        >
          {props.title}
        </Typography>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
        >
          {props.price}
        </Typography>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
        >
          {props.description}
        </Typography>
      </CardContent>
      <CardActions 
        className='child' 
        sx={{ justifyContent: 'space-between', paddingX: 1, display: 'flex', alignItems: 'center' }}  // Ensure flex display and alignment
      >
        {props.children && props.children.length > 1 ? props.children.slice(1) : null}  {/* Render Bookmark and More Details button if available */}
      </CardActions>
    </Card>
  );
}
