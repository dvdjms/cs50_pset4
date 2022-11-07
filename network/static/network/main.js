document.addEventListener('DOMContentLoaded', function() {
   
    // By default, load the inbox
    fetch_messages();
});


// Function to post message to database when submit button clicked
window.onload = function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('#messageform').onsubmit = function() {
    
            // Get contents of message box  
            const message = document.querySelector('#messagebox').value;

            // Ensure a message has been entered
            if (document.querySelector('#messagebox').value == "") {
                document.querySelector('#errormessage').innerHTML = "Enter message before posting.";
                return false;
            }
            // Post to database
            fetch('postmessage/message', {
                method: 'POST',
                body: JSON.stringify({
                message: message
                })
            })
            .then(response => response.json())
            .then(result => {

                // Load posted message to index page. 10 per page. Message, user, timestamp. Like button. 
                console.log(result); 

                /////////////////////////////////////////////////////////////////////////////////////////  
            });
            // Clear message box
            document.querySelector('#messagebox').value = "";
            fetch_messages();
            window.location = window.location
            //location.reload();
            return false;
        };
    });
};


// Function to get messages from database
function fetch_messages() {
    
    fetch('getmessage/message')
    .then(response => response.json())
    .then(message => {
        // For each message create elements and render sender, subject, timestamp
        Array.from(message).forEach(message => {
            // Assign ul attribute to variable (parent)
            const unorderedlist = document.querySelector('#messages');
            // Create li attribute
            const boxli = document.createElement('li');
            boxli.setAttribute("id", "boxli");
            // Create div for user, edit, message, timestamp, like, likes counter
            const boxdiv1 = document.createElement('div');
            boxdiv1.setAttribute("id", "boxdiv1");
            const boxdiv2 = document.createElement('div');
            boxdiv2.setAttribute("id", "boxdiv2");
            const boxdiv3 = document.createElement('div');
            boxdiv3.setAttribute("id", "boxdiv3");
            const boxdiv4 = document.createElement('div');
            boxdiv4.setAttribute("id", "boxdiv4");
            const boxdiv5 = document.createElement('div');
            boxdiv5.setAttribute("id", "boxdiv5");
            const boxdiv6 = document.createElement('div');
            boxdiv6.setAttribute("id", "boxdiv6");  

            // Create buttons for profile page, edit, like
            const profilebutton = document.createElement('button');
            profilebutton.setAttribute("id", "profilebutton");
            const editbutton = document.createElement('button');
            editbutton.setAttribute("id", "editbutton");
            const likebutton = document.createElement('button');
            likebutton.setAttribute("id", "likebutton");

            // Functions to call Profile, Edit, and Like
            profilebutton.addEventListener('click', () => view_profile(message.username));
            editbutton.addEventListener('click', () => edit_message(message.username));
            likebutton.addEventListener('click', () => like_message(message.username));

            // AppendChild and assign innerHTML with user, edit, message, timestamp, like, likes counter
            unorderedlist.appendChild(boxli).appendChild(boxdiv1).appendChild(profilebutton).innerHTML = `<strong>${message['username']}</strong>`;
            unorderedlist.appendChild(boxli).appendChild(boxdiv2).appendChild(editbutton).innerHTML = "Edit";
            unorderedlist.appendChild(boxli).appendChild(boxdiv3).innerHTML = `${message['message']}`;
            unorderedlist.appendChild(boxli).appendChild(boxdiv4).innerHTML = `${message['timestamp']}`;
            unorderedlist.appendChild(boxli).appendChild(boxdiv5).appendChild(likebutton).innerHTML = "Like";
            unorderedlist.appendChild(boxli).appendChild(boxdiv6).innerHTML = `<strong>${message['likes']}</strong>`;
        });
   });
};


// // Function to load profile page
function view_profile(username) {
    
    document.querySelector('#container-child1').style.display = 'block';
    console.log(username)
    fetch_messages(username); // this is not needed
 
    //document.querySelector('#profile-block').style.display = 'block';
    //document.querySelector('#profileheader').innerHTML = "hello";//`${username}`
    //document.querySelector('#profile-header2').style.display = 'block';

    window.location.href = "/" + `profile/${username}`;
};







function edit_message(username) {
    //const username = document.querySelector('#userprofilelink').value;
    console.log(username);
};


function like_message(username) {
    //const username = document.querySelector('#userprofilelink').value;
    console.log(username);
};
