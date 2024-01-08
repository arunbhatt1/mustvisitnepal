function validate(e){
    var name,email,package,phone,comments;
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    comments = document.getElementById('comments').value;
    if(name=='' || email=='' || package=='' || phone=='' || comments==''){
        if(name==''){
            document.getElementById('nameErr').innerHTML="Name is required";
            document.getElementById('name').style="border-color:red";  
        }
        if(email==''){
            document.getElementById('emailErr').innerHTML="email is required";
            document.getElementById('email').style="border-color:red";
        }
        if(package==''){
            document.getElementById('packageErr').innerHTML="Package is required";
            document.getElementById('package').style="border-color:red";  
        }
        if(phone==''){
            document.getElementById('phoneErr').innerHTML="phone number is required";
            document.getElementById('phone').style="border-color:red";
        }
        if(comments==''){
            document.getElementById('commentErr').innerHTML="comments are required";
            document.getElementById('comments').style="border-color:red";
        }
        e.preventDefault();
    }

}
document.getElementById('booking').addEventListener('submit',validate)