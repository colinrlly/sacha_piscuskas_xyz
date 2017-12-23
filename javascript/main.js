//Pre: A loaded DOM
//Post: Other drop-down menus are closed; art drop-down is open
//Pupose: To drop the art drop-down menu and close the others
function dropArtMenu()
{
    $( ".grid" ).isotope({filter: '.grid-item'});
    $( "#sub-menu" ).slideToggle( "slow", function() {
        if ($( "#contact" ).css( "Display" ) == "block")
            $( "#contact" ).slideUp( "slow" );
        if ($( "#about" ).css( "Display" ) == "block" )
            $( "#about" ).slideUp( "slow" );
    });
}

//Pre: Loaded DOM
//Post: All shown grid items now have the 'data-lightbox' attribute of 'clickedText'
//Purpose: Changes the 'data-lightbox' attribute to whatever the text of the link in the art drop down menu is. I did this in order to only rotate through the shown grid items
//when viewing the grid through the lightbox
//similar to filterGrid we use simple text so it can be switched when the grid is filtered
function setDataLightbox(clickedText) 
{
    $( ".grid a img" ).each( function()
    {
        if ( $(this).hasClass(clickedText) )
        {
            $(this).parent().attr("data-lightbox", clickedText);
        }
    })
}

//Pre: Art menu is dropped
//Post: Grid is filtered to the desired type of art
//Purpose: To filter the grid, using nothing but the text in the link to decide which items to keep and which ones to hide
function filterGrid()
{
    //use text to filter so we can easily switch text and maintain functionality
    if ( $(this).text() == "ART" ) {
        $('.grid').isotope({ 
            filter: "*"
        });
        setDataLightbox( "grid-item" );
    }
    else {
        var filterValue = "." + $(this).text().toLowerCase();
        $('.grid').isotope({ 
            filter: filterValue
        });
        setDataLightbox( $(this).text().toLocaleLowerCase() );
    }
    
    //switch text to keep consitent
    var dropText = $( "nav ul li a.filter-button-group" ).text();
    var clickedText = $(this).text();
    $( "nav ul li a.filter-button-group" ).text( clickedText );
    $( this ).text( dropText );
    
    //re-layout images because it messes up otherwise
    $('.grid').isotope('layout');
}

//Pre: Loaded DOM
//Post: Other drop-down menus are closed; art drop-down is open
//Purpose: Drop the about section
function loadAbout()
{
    $( "#about" ).slideToggle( "slow", function() {
        if ($( "#contact" ).css( "Display" ) == "block" )
            $( "#contact" ).slideUp( "slow" );
        if ($( "#sub-menu" ).css( "Display" ) == "block" )
            $( "#sub-menu" ).slideUp( "slow" );
    });
}

//Pre: Loaded DOM
//Post: Other drop-down menus are closed; art drop-down is open
//Purpose: Drop the contact form
function loadContact()
{
    $( "#contact" ).slideToggle( "slow", function() {
        if ($( "#about" ).css( "Display" ) == "block" )
            $( "#about" ).slideUp( "slow" );
        if ($( "#sub-menu" ).css( "Display" ) == "block" )
            $( "#sub-menu" ).slideUp( "slow" );
    });
}

//purpose: Run the isotope layout algorithm
function runIsotope() {
    $('.grid').isotope({
    // options
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-item',
            isFitWidth: true
        }
    }); 
}

//Pre: Nothing, this is the first function to run  
//Post: Buttons are binded, isotope is run
//Purpose: To run preliminary functions to get the page ready after it loads
$(document).ready ( function() 
{
    //bind buttons
    $( "a#menuButton" ).click(dropArtMenu);
    $( "a#aboutButton" ).click(loadAbout);
    $( "a#contactButton" ).click(loadContact);
    $('.filter-button-group').click(filterGrid);
    
    //initialize isoptope plug-in
    $('.grid').isotope({
    // options
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-item',
            isFitWidth: true
        }
    });   
    
    // layout Isotope after all the images have loaded
    $('.grid').imagesLoaded( function() {
        runIsotope();
    });
    
    //Wait 100 miliseconds after width of page is resized, then run layout algorithm again.
    $( window ).resize(function() {
        window.setTimeout(runIsotope, 300);
        console.log("resized");
    });
    
})