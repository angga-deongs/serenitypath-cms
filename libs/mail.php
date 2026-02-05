<?php

// if(isset($_POST['action'])){
//     print_r($_POST);die;
// }

if(isset($_POST['action']) && $_POST['action'] == 'mail'){

    if($_POST['type'] == 'contact'){
        $to = 'info@serenitypath.com';
        $subject = '[Contact] '.$_POST['contact-subject'];
        $message = 'Name: '.$_POST['contact-name']."\r\n".
            'Mobile: '.$_POST['contact-phone']."\r\n".
            'Email: '.$_POST['contact-email']."\r\n".
            'Message: '.$_POST['contact-message'];
        $headers = 'From: info@serenitypath.com' . "\r\n" .
            'Reply-To: info@serenitypath.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        // Send the email
        if (mail($to, $subject, $message, $headers)) {
            // echo 'mail sent';die;
            // echo '<script>alert("Email sent successfully!")</script>';
        } else {
            // echo 'mail failed';die;
            // echo '<script>alert("Failed. Please try again later.")</script>';
        }
    }
    else if($_POST['type'] == 'subscribe'){

        $to = 'info@serenitypath.com';
        $subject = 'Someone join your subscription mailing list!';
        $message = $_POST['from'].' join your mailing list';
        $headers = 'From: info@serenitypath.com' . "\r\n" .
            'Reply-To: info@serenitypath.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        // Send the email
        if (mail($to, $subject, $message, $headers)) {
            // echo 'mail sent';die;
            // echo '<script>alert("successfully subscribe!")</script>';die;
        } else {
            // echo 'mail failed';die;
            // echo '<script>alert("Failed. Please try again later.")</script>';die;
        }
    }
}
?>