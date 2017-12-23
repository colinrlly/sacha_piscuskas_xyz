$(document).ready ( function() 
{
    
    //initialize isoptope plug-in
    $('.grid').isotope({
      // options
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-item',
            //isFitWidth: true
        }
    });
})