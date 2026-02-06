<?php
    require './libs/index.php';
?>

<!DOCTYPE html>
<html lang="en">
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <title>Serenity Path</title>
        <meta name="description" content="At Serenity Path, our goal is to deliver exceptional care through our experienced medical team, right in the comfort of your home. With unwavering dedication, we adhere to rigorous protocols that protect your personal information, ensuring utmost confidentiality. You can trust that your privacy remains our top priority, safeguarded throughout your entire journey with us." />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Serenity Path." />
        <meta property="og:description" content="At Serenity Path, our goal is to deliver exceptional care through our experienced medical team, right in the comfort of your home. With unwavering dedication, we adhere to rigorous protocols that protect your personal information, ensuring utmost confidentiality. You can trust that your privacy remains our top priority, safeguarded throughout your entire journey with us." />
        <meta property="og:site_name" content="Serenity Path." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="../cdn.sanity.io/images/3h389p8z/production/83583d23557f18264e84bcfb9bc9938435294b18-1200x630.0.delayed" />
        <meta property="og:image:secure_url" content="" />
        <meta property="og:image:alt" content="Serenity Path." />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="" />
        <meta name="twitter:title" content="Serenity Path." />
        <meta name="twitter:description" content="At Serenity Path, our goal is to deliver exceptional care through our experienced medical team, right in the comfort of your home. With unwavering dedication, we adhere to rigorous protocols that protect your personal information, ensuring utmost confidentiality. You can trust that your privacy remains our top priority, safeguarded throughout your entire journey with us." />
        <!-- <meta name="twitter:image" content="https://cdn.sanity.io/images/3h389p8z/production/83583d23557f18264e84bcfb9bc9938435294b18-1200x630.jpg" /> -->
        <!-- <meta name="twitter:image:alt" content="Atria—Turning science into medicine." /> -->
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <!-- <link rel="apple-touch-icon" sizes="180x180" href="icons/favicon-180x180.php" />
        <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" /> -->
        <link rel="stylesheet" href="app.css" />

        <script src="https://tympanus.net/Development/DistortionHoverEffect/js/imagesloaded.pkgd.min.js"></script>
        <script src="https://tympanus.net/Development/DistortionHoverEffect/js/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
    </head>
    <!-- <script async src="../www.googletagmanager.com/gtag/js.64f90.delayed?id=G-CQ8JZJNCB4"></script> -->
    <!-- <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
    </script> -->
    <body>
        <svg id="icons">
            <symbol id="logo" fill="inherit" viewBox="0 0 73.51 14.44">
                  <g id="logo_layer" data-name="logo layer">
                    <g>
                      <g>
                        <path class="cls-logo" d="M4.75,4.77s-.86-.87-2.17-.87c-.87,0-1.68,.35-1.68,1.15,0,.69,.65,.96,1.69,1.41,1.64,.71,2.83,1.23,2.83,2.54,0,1.03-.83,1.92-2.83,1.92-1.82,0-2.58-.78-2.58-.78v-.59s.99,1.15,2.59,1.15c1.33,0,1.88-.69,1.88-1.26,0-.84-1.07-1.31-1.92-1.7C1.11,7.06,.11,6.48,.11,5.41c0-1.19,1.17-1.73,2.49-1.73s2.15,.56,2.15,.56v.52Z"/>
                        <path class="cls-logo" d="M7.33,7.07v.24c0,1.6,.49,3.38,2.35,3.38,1.54,0,2.2-1.26,2.23-1.33v.6s-.71,.95-2.34,.95c-2.16,0-3.4-1.69-3.4-3.6,0-2.02,1.31-3.63,3.21-3.63s2.95,1.49,3.05,3.39H7.33Zm0-.22h3.91c-.1-1.58-.47-2.94-1.87-2.94-1.3,0-1.95,1.24-2.04,2.94Z"/>
                        <path class="cls-logo" d="M17.28,4.41c-1.75,0-2.56,1.46-2.56,3.35v3.05h-1.11V3.82h1.11v2.48c.1-.56,.32-1.17,.74-1.7,.39-.49,.99-.92,1.82-.92v.73Z"/>
                        <path class="cls-logo" d="M18.64,7.07v.24c0,1.6,.49,3.38,2.35,3.38,1.54,0,2.2-1.26,2.23-1.33v.6s-.71,.95-2.34,.95c-2.16,0-3.4-1.69-3.4-3.6,0-2.02,1.31-3.63,3.21-3.63s2.95,1.49,3.05,3.39h-5.1Zm0-.22h3.91c-.1-1.58-.47-2.94-1.87-2.94-1.3,0-1.95,1.24-2.04,2.94Z"/>
                        <path class="cls-logo" d="M29.69,6.35c0-1.03-.02-2.44-1.39-2.44-1.67,0-2.27,2.11-2.27,3.75v3.14h-1.11V3.82h1.11v2.56c.14-.94,.59-2.7,2.45-2.7,1.44,0,2.32,1.06,2.32,2.66v4.45h-1.11V6.35Z"/>
                        <path class="cls-logo" d="M32.41,3.82h1.11v6.98h-1.11V3.82Z"/>
                        <path class="cls-logo" d="M34.72,3.82h1.19v-1.75l1.11-.8V3.82h2.02v.22h-2.02v4.37c0,.91,0,2.23,1.1,2.23,.33,0,.57-.09,.57-.09v.22s-.27,.09-.57,.09c-1.82,0-2.21-1.31-2.21-3.01v-3.82h-1.19v-.22Z"/>
                        <path class="cls-logo" d="M40.74,3.82l2.45,5.55,2.44-5.55h.25l-4.67,10.63h-.25l1.65-3.75-3.01-6.87h1.15Z"/>
                        <path class="cls-logo" d="M48.53,3.82h1.11v1.15c.42-.8,1.15-1.28,2.23-1.28,1.83,0,3.21,1.63,3.21,3.6s-1.38,3.63-3.21,3.63c-1.1,0-1.81-.49-2.23-1.28v4.81h-1.11V3.82Zm5.41,3.47c0-1.83-.64-3.38-2.17-3.38s-2.12,1.55-2.12,3.38,.6,3.4,2.12,3.4,2.17-1.58,2.17-3.4Z"/>
                        <path class="cls-logo" d="M60.19,9.53c-.26,.61-.87,1.38-2.26,1.38-1.26,0-2.23-.64-2.23-1.89,0-1.34,1.14-1.8,2.84-2.44,1.41-.53,1.42-.87,1.42-1.43,0-.62-.16-1.25-1.22-1.25-1.43,0-2.19,1.07-2.22,1.12v-.59s.76-.76,2.3-.76c2.23,0,2.31,1.59,2.31,2.23v2.89c0,1.7,.51,1.78,.71,1.78,.25,0,.42-.13,.42-.13v.17s-.15,.18-.57,.18c-.7,0-1.22-.49-1.49-1.27Zm-.19-3.79c-.18,.47-.49,.63-1.44,1.1-1.15,.57-1.7,1.07-1.7,2.2,0,.93,.47,1.65,1.36,1.65s1.61-.6,1.9-1.41c-.07-.3-.11-.64-.11-1v-1.96c0-.18,0-.41,0-.57Z"/>
                        <path class="cls-logo" d="M62.24,3.82h1.19v-1.75l1.11-.8V3.82h2.02v.22h-2.02v4.37c0,.91,0,2.23,1.1,2.23,.33,0,.57-.09,.57-.09v.22s-.27,.09-.57,.09c-1.82,0-2.21-1.31-2.21-3.01v-3.82h-1.19v-.22Z"/>
                        <path class="cls-logo" d="M72.39,6.35c0-1.03-.02-2.44-1.39-2.44-1.67,0-2.27,2.11-2.27,3.75v3.14h-1.11V0h1.11V6.38c.14-.94,.59-2.7,2.45-2.7,1.44,0,2.32,1.06,2.32,2.66v4.45h-1.11V6.35Z"/>
                      </g>
                      <polygon class="cls-logo" points="32.2 1.87 32.78 2.67 33.47 2.18 33.81 1.49 33.17 .79 32.37 .44 32.09 1.32 32.2 1.87"/>
                    </g>
                  </g>
            </symbol>
            <symbol id="logo_green" fill="inherit" viewBox="0 0 73.51 14.44">
                <defs>
                    <style>
                      .cls-1 {
                        fill: #3d4e3b;
                      }
                    </style>
                  </defs>
                  <g id="logo_green" data-name="logo green">
                    <g>
                      <g>
                        <path class="cls-1" d="M4.75,4.77s-.86-.87-2.17-.87c-.87,0-1.68,.35-1.68,1.15,0,.69,.65,.96,1.69,1.41,1.64,.71,2.83,1.23,2.83,2.54,0,1.03-.83,1.92-2.83,1.92-1.82,0-2.58-.78-2.58-.78v-.59s.99,1.15,2.59,1.15c1.33,0,1.88-.69,1.88-1.26,0-.84-1.07-1.31-1.92-1.7C1.11,7.06,.11,6.48,.11,5.41c0-1.19,1.17-1.73,2.49-1.73s2.15,.56,2.15,.56v.52Z"/>
                        <path class="cls-1" d="M7.33,7.07v.24c0,1.6,.49,3.38,2.35,3.38,1.54,0,2.2-1.26,2.23-1.33v.6s-.71,.95-2.34,.95c-2.16,0-3.4-1.69-3.4-3.6,0-2.02,1.31-3.63,3.21-3.63s2.95,1.49,3.05,3.39H7.33Zm0-.22h3.91c-.1-1.58-.47-2.94-1.87-2.94-1.3,0-1.95,1.24-2.04,2.94Z"/>
                        <path class="cls-1" d="M17.28,4.41c-1.75,0-2.56,1.46-2.56,3.35v3.05h-1.11V3.82h1.11v2.48c.1-.56,.32-1.17,.74-1.7,.39-.49,.99-.92,1.82-.92v.73Z"/>
                        <path class="cls-1" d="M18.64,7.07v.24c0,1.6,.49,3.38,2.35,3.38,1.54,0,2.2-1.26,2.23-1.33v.6s-.71,.95-2.34,.95c-2.16,0-3.4-1.69-3.4-3.6,0-2.02,1.31-3.63,3.21-3.63s2.95,1.49,3.05,3.39h-5.1Zm0-.22h3.91c-.1-1.58-.47-2.94-1.87-2.94-1.3,0-1.95,1.24-2.04,2.94Z"/>
                        <path class="cls-1" d="M29.69,6.35c0-1.03-.02-2.44-1.39-2.44-1.67,0-2.27,2.11-2.27,3.75v3.14h-1.11V3.82h1.11v2.56c.14-.94,.59-2.7,2.45-2.7,1.44,0,2.32,1.06,2.32,2.66v4.45h-1.11V6.35Z"/>
                        <path class="cls-1" d="M32.41,3.82h1.11v6.98h-1.11V3.82Z"/>
                        <path class="cls-1" d="M34.72,3.82h1.19v-1.75l1.11-.8V3.82h2.02v.22h-2.02v4.37c0,.91,0,2.23,1.1,2.23,.33,0,.57-.09,.57-.09v.22s-.27,.09-.57,.09c-1.82,0-2.21-1.31-2.21-3.01v-3.82h-1.19v-.22Z"/>
                        <path class="cls-1" d="M40.74,3.82l2.45,5.55,2.44-5.55h.25l-4.67,10.63h-.25l1.65-3.75-3.01-6.87h1.15Z"/>
                        <path class="cls-1" d="M48.53,3.82h1.11v1.15c.42-.8,1.15-1.28,2.23-1.28,1.83,0,3.21,1.63,3.21,3.6s-1.38,3.63-3.21,3.63c-1.1,0-1.81-.49-2.23-1.28v4.81h-1.11V3.82Zm5.41,3.47c0-1.83-.64-3.38-2.17-3.38s-2.12,1.55-2.12,3.38,.6,3.4,2.12,3.4,2.17-1.58,2.17-3.4Z"/>
                        <path class="cls-1" d="M60.19,9.53c-.26,.61-.87,1.38-2.26,1.38-1.26,0-2.23-.64-2.23-1.89,0-1.34,1.14-1.8,2.84-2.44,1.41-.53,1.42-.87,1.42-1.43,0-.62-.16-1.25-1.22-1.25-1.43,0-2.19,1.07-2.22,1.12v-.59s.76-.76,2.3-.76c2.23,0,2.31,1.59,2.31,2.23v2.89c0,1.7,.51,1.78,.71,1.78,.25,0,.42-.13,.42-.13v.17s-.15,.18-.57,.18c-.7,0-1.22-.49-1.49-1.27Zm-.19-3.79c-.18,.47-.49,.63-1.44,1.1-1.15,.57-1.7,1.07-1.7,2.2,0,.93,.47,1.65,1.36,1.65s1.61-.6,1.9-1.41c-.07-.3-.11-.64-.11-1v-1.96c0-.18,0-.41,0-.57Z"/>
                        <path class="cls-1" d="M62.24,3.82h1.19v-1.75l1.11-.8V3.82h2.02v.22h-2.02v4.37c0,.91,0,2.23,1.1,2.23,.33,0,.57-.09,.57-.09v.22s-.27,.09-.57,.09c-1.82,0-2.21-1.31-2.21-3.01v-3.82h-1.19v-.22Z"/>
                        <path class="cls-1" d="M72.39,6.35c0-1.03-.02-2.44-1.39-2.44-1.67,0-2.27,2.11-2.27,3.75v3.14h-1.11V0h1.11V6.38c.14-.94,.59-2.7,2.45-2.7,1.44,0,2.32,1.06,2.32,2.66v4.45h-1.11V6.35Z"/>
                      </g>
                      <polygon class="cls-1" points="32.2 1.87 32.78 2.67 33.47 2.18 33.81 1.49 33.17 .79 32.37 .44 32.09 1.32 32.2 1.87"/>
                    </g>
                  </g>
            </symbol>
            <symbol id="open" viewBox="0 0 38 38" fill="none">
                <path d="M33.6043 33.4238L31.799 7.68261L33.5713 6.77411L3.17272 37.1727L0.341297 34.3413L30.7399 3.94269L29.9751 5.66726L4.09024 3.90976L7.77637 0.223627L35.6741 1.79189L37.2904 29.7376L33.6043 33.4238Z" fill="#3C4E3D" />
            </symbol>
            <symbol id="arrowLeft" fill="none" viewBox="0 0 41 8">
                <path
                    fill="#3C4E3D"
                    d="M.64645 3.64645c-.19527.19526-.19527.51184 0 .70711l3.18198 3.18198c.19526.19526.51184.19526.7071 0 .19527-.19527.19527-.51185 0-.70711L1.70711 4l2.82842-2.82842c.19527-.19527.19527-.51185 0-.70711-.19526-.19526-.51184-.19526-.7071 0L.64645 3.64645ZM41 3.5H1v1h40v-1Z"
                />
            </symbol>
            <symbol id="arrowRight" fill="none" viewBox="0 0 41 8">
                <path
                    fill="#3C4E3D"
                    d="M40.3536 4.35355c.1952-.19526.1952-.51184 0-.7071L37.1716.46447c-.1953-.19527-.5119-.19527-.7071 0-.1953.19526-.1953.51184 0 .7071L39.2929 4l-2.8284 2.82843c-.1953.19526-.1953.51184 0 .7071.1952.19527.5118.19527.7071 0l3.182-3.18198ZM0 4.5h40v-1H0v1Z"
                />
            </symbol>
            <symbol id="selectArrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 9"><path fill="#3C4E3D" d="M6 9 .804 0h10.392L6 9Z" /></symbol>
            <symbol id="close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10">
                <path fill="#3C4E3D" fill-rule="evenodd" d="M9.95 1.464 8.536.05 5 3.586 1.464.05.05 1.464 3.586 5 .05 8.535 1.464 9.95 5 6.414 8.536 9.95 9.95 8.535 6.414 5 9.95 1.464Z" clip-rule="evenodd" />
            </symbol>
        </svg>
        <main data-router-wrapper="data-router-wrapper">
            <div class="page is-home -kelp" data-router-view="page" data-smooth="data-smooth">
                <div class="menuMobile">
                    <div class="menuMobile-content s">
                        <div class="header">
                            <div class="header-content s">
                                <a href="index.php" class="logo" aria-label="Home Page">
                                    <svg class="icon cover"><use xlink:href="#logo"></use></svg>
                                </a>
                                <div class="close">
                                    <div class="line"></div>
                                    <div class="line"></div>
                                </div>
                            </div>
                        </div>
                        <nav class="menu">
                            <ul class="menu-list">
                                <li class="menu-item"><a href="index.php" class="menu-link t5">Serenity Path</a></li>
                                <li class="menu-item"><a href="services.php" class="menu-link t5">Supplementary Care</a></li>
                                <li class="menu-item"><a href="contact.php" class="menu-link t5">Contact</a></li>
                            </ul>
                            <!-- <ul class="menu-list">
                                <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Career Opportunities</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Request Info</a></li>
                            </ul> -->
                        </nav>
                    </div>
                </div>
                <header class="header">
                    <div class="header-content s">
                        <a href="index.php" class="logo sp-logo" aria-label="Home Page">
                            <svg class="icon cover"><use xlink:href="#logo_green"></use></svg>
                        </a>
                        <nav class="menu">
                            <ul class="menu-list">
                                <li class="menu-item"><a href="index.php" class="menu-link p">Serenity Path</a></li>
                                <li class="menu-item"><a href="services.php" class="menu-link p">Supplementary Care</a></li>
                                <li class="menu-item"><a href="contact.php" class="menu-link p">Contact</a></li>
                            </ul>
                        </nav>
                        <div class="burger">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </header>
                <section class="hero -full" data-smooth-item="data-smooth-item" style="background: #E8E5E0;">
                    <div class="hero-content s" style="background: #E8E5E0;">
                        <div class="hero-title">
                            <div data-plane="fbo"></div>
                            <h1 class="t2 title-line" data-split="lines,words,chars" style="font-size: 80px;">Reimagining the<br />Path to Recovery</h1>
                            <!-- <h2 class="t2 title-line" data-split="lines,words,chars">into medicine.</h2> -->
                        </div>
                        <div class="hero-footer">
                            <div class="hero-footer_inner">
                                <!-- <div class="hero-block">
                                    <div class="hero-tag"><p class="p2">One step at a time.</p></div>
                                    <div class="hero-tag"><p class="p2">One life at a time.</p></div>
                                </div> -->
                                <div class="hero-description"><p class="p">One step at a time.<br />One life at a time.</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="hero-asset">
                        <div class="asset-crop">
                            <video
                                src="video/landing.mp4"
                                class="cover loaded"
                                autoplay
                                loop
                                muted
                                playsinline
                            ></video>
                        </div>
                    </div>
                </section>
                <section class="marquee" data-smooth-item="data-smooth-item">
                    <div class="marquee-content">
                        <h2 class="t4 marquee-title">
                            <span class="marquee-container"><span class="marquee-line">Unwavering focus on personalized care in a familiar and discrete environment. </span><span class="marquee-line">Unwavering focus on personalized care in a familiar and discrete environment. </span><span class="marquee-line">Unwavering focus on personalized care in a familiar and discrete environment. </span></span>
                        </h2>
                        <div class="p3 marquee-description">
                            <span>Experience an exclusive, confidential, and cutting-edge approach designed specifically for our high-profile clients seeking exceptional and private services. Our dedicated care managers, in collaboration with an esteemed medical team, will deliver personalized care in the convenience of your own home, minimizing any disruption to your daily life.</span>
                        </div>
                    </div>
                </section>
                <section id="personalized" class="textblock -message -three" data-smooth-item="data-smooth-item">
                    
                    <!-- <video src="video/pasir.mp4" class="cover loaded" autoplay loop muted playsinline style="height: 100%;"></video> -->
                    <div class="container-pasir">

                        <div class="personalized-word">
                            <p class="w1">Patient's Unique Case</p>
                            <p class="w2">Standard Recovery Plan</p>
                            <p class="w3">Personalized Plan</p>
                        </div>

                        <div class="personalized-info">
                            <p class="t5 mobile-personalized">
                                Personalized Care:<br />
                                Every path is different
                            </p>

                            <div class="p1 personalized-description">
                                <span>The team will collaborate with our client’s throughout the process, continuously adapting and refining a unique, flexible plan for optimal success.</span>
                            </div>
                        </div>

                        <img src="images/pasir.gif" alt="" style="width: 100%;">
                    </div>

                </section>
                <section class="splitblock" data-smooth-item="data-smooth-item">
                    <div class="splitblock-content">
                        <!-- <div class="splitblock-top">
                            <h2 class="t1 splitblock-title -large"><span>Recover with us</span></h2>
                        </div> -->
                        <div class="splitblock-repater">
                            <div class="splitblock-item">
                                <div class="split-content">
                                    <div>
                                        <div class="split-header">
                                            <h3 class="t4 split-title" style="text-align: left; padding: 0 5.5555555556vw;">Your privacy<br />is our priority</h3>
                                        </div>
                                        <p class="p1 split-description">
                                            Our goal is to deliver exceptional care right in the comfort of your home. With unwavering dedication, we adhere to rigorous protocols that protect your personal information, ensuring utmost confidentiality. You can trust that your privacy remains our top priority, safeguarded throughout your entire journey with us.
                                        </p>
                                    </div>
                                    <!-- <a href="institute/index.php" class="button p1">The Atria Institute</a> -->
                                </div>
                                <div class="split-asset">
                                    <div class="asset-crop" data-displacement="images/6.jpg" data-intensity="0.6" data-speedIn="1.2" data-speedOut="0.5">
                                        <!-- <div data-plane></div> -->
                                        <!-- <img class="cover blureffect desktop" src="images/placeholder.png" />
                                        <img class="cover blureffect" src="images/home2.jpg" /> -->
                                        <img class="cover img desktop" src="images/home2.jpg" data-large="images/home2.jpg" />
                                        <img class="cover mobile" src="images/home2.jpg" data-large="images/home2.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="splitblock-item">
                                <div class="split-asset desktop">
                                    <div class="asset-crop" data-displacement="images/6.jpg" data-intensity="0.6" data-speedIn="1.2" data-speedOut="0.5">
                                        <!-- <div data-plane></div> -->
                                        <!-- <img class="cover blureffect desktop" src="images/placeholder.png" />
                                        <img class="cover blureffect" src="images/home3.jpg" /> -->
                                        <img class="cover img desktop" src="images/home3.jpg" data-large="images/home3.jpg" />
                                        <img class="cover mobile" src="images/home3.jpg" data-large="images/home3.jpg" />
                                    </div>
                                </div>
                                <div class="split-content">
                                    <div>
                                        <div class="split-header">
                                            <!-- <p class="p1 split-tag">Translating science into medicine.</p> -->
                                            <h3 class="t4 split-title" style="text-align: left; padding: 0 5.5555555556vw;">Setting a<br />new standard<br />for service</h3>
                                        </div>
                                        <p class="p1 split-description">
                                            Since its inception, The Company has forged an extraordinary path, guided by four foundational principles that radiate throughout our every endeavor: the epitome of privacy, boundless compassion, the pinnacle of medical expertise, and the seamless artistry of bespoke service.<br /><br />
                                            
                                            Sustained by our team's unwavering dedication to daring ingenuity and heartfelt devotion, these principles epitomize Serenity Path's unrelenting pursuit of perfection.
                                        </p>
                                    </div>
                                    <!-- <a href="academy/index.php" class="button p1">The Atria Academy of Science &amp; Medicine</a> -->
                                </div>
                                <div class="mobile">
                                    <img class="cover loaded" src="images/home3.jpg" />
                                </div>
                                
                            </div>
                            <!-- <div class="splitblock-item" data-link="/collab/" data-cursor="link">
                                <div class="split-content">
                                    <div class="split-header">
                                        <p class="p1 split-tag">Committing to the greater good.</p>
                                        <h3 class="t4 split-title">The Atria Health Collaborative</h3>
                                    </div>
                                    <p class="p1 split-description">
                                        The Atria Health Collaborative is a nonprofit organization that engages the expertise, passion, and resources of the entire Atria team to improve health care at scale. We bring together a community of
                                        doctors, researchers, and public health experts to invest in and promote proven interventions and promising new approaches to preventable and reversible diseases.
                                    </p>
                                    <a href="collab/index.php" class="button p1">The Atria Health Collaborative</a>
                                </div>
                                <div class="split-asset">
                                    <div class="asset-crop">
                                        <div data-plane></div>
                                        <img class="cover loaded" src="../cdn.sanity.io/images/3h389p8z/production/c400f4d1abb2e9549ae3cc381134567e6f47302b-960x144075cc.jpg?w=800" alt="Atria Collab" />
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </section>
                <section class="splitblock" data-smooth-item="data-smooth-item">
                    <div class="splitblock-content splitblock-line" style="padding-top: 12vw;">
                        <div class="splitblock-top">
                            <h2 class="t1 splitblock-title -large" style="border:none; padding-bottom: 30px; font-size: 80px;"><span>Recover with us</span></h2>
                            <a href="contact.php" class="p1 btn-submit btn-green" style="margin: 0 auto;">Contact Us</a>
                        </div>
                    </div>
                </section>
                <section id="subscribe" class="subscribe" data-smooth-item="data-smooth-item">
                    <div class="subscribe-content s">
                        <form class="subscribe-form" method="POST" action="/">
                            <input type="hidden" name="action" value="mail" />
                            <input type="hidden" name="type" value="subscribe" />
                            <div class="subscribe-content">
                                <div class="form-group">
                                    <label class="p1" for="newsletter_email">Leave your email here & we will be in touch</label>
                                    <input class="newsletter-input" id="newsletter_email" name="from" type="email" placeholder="Enter your email here" required />
                                </div>
                                <div class="form-group">
                                    <button class="p1 subscribe-submit">Send Email</button>
                                </div>
                            </div>
                            <p class="p1 contact-success">Thanks for signing up!</p>
                        </form>
                    </div>
                </section>
                <footer class="footer" data-smooth-item="data-smooth-item">
                    <div class="footer-content s">
                        <div class="footer-block footer-top"></div>
                        <!-- <div class="footer-block footer-top">
                            <a href="index.php" class="logo" aria-label="Home Page">
                                <svg class="icon cover"><use xlink:href="#logo"></use></svg>
                            </a>
                            <p class="p4 footer-tag">Translating science into medicine.</p>
                            <ul class="menu-list">
                                <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Serenity Path</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Services</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Contact</a></li>
                            </ul>
                            
                        </div> -->
                        <div class="footer-block footer-mid">
                            <ul class="menu-list"></ul>
                            <ul class="menu-list"></ul>
                            <!-- <ul class="menu-list">
                                <li class="menu-item" style="margin-bottom: 20px;"><a href="#" class="menu-link p"><strong>Physical Health</strong></a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">IV Drips</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Massage</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Reflexology</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Acupuncture</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Personal chef & Nutritionist plan</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Juice cleanse</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Herbal approaches,</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Biochemical restoration</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Personal training</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Intermittent Hypoxic Hyperoxic Treatment</a></li>
                            </ul>
                            <ul class="menu-list">
                                <li class="menu-item" style="margin-bottom: 20px;"><a href="#" class="menu-link p"><strong>Mental Health</strong></a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Somatic Body Therapy</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">CBT & ACT</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Transcendental & mindfulness meditation training </a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Family Therapy</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p">Spiritual Counseling</a></li>
                            </ul> -->
                            <ul class="menu-list">
                                <li class="menu-item"><a href="index.php" class="menu-link p" rel="noreferrer">Serenity Path</a></li>
                                <li class="menu-item"><a href="services.php" class="menu-link p" rel="noreferrer">Supplementary Care</a></li>
                                <li class="menu-item" style="margin-bottom: 20px;"><a href="contact.php" class="menu-link p" rel="noreferrer">Contact</a></li>

                                <!-- <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Career Opportunity</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Terms & Condition</a></li>
                                <li class="menu-item"><a href="#" class="menu-link p" target="_blank" rel="noreferrer">Privacy Policy</a></li> -->
                            </ul>
                        </div>
                        <div class="social">
                            <a href="https://www.instagram.com/serenitypath_/" class="ig"></a>
                            <a href="https://web.facebook.com/profile.php?id=100093248623743" class="fb"></a>
                            <a href="https://twitter.com/serenitypath_" class="tw"></a>
                            <a href="https://www.tiktok.com/@serenitypath_?_t=8cxHtozeR8M&_r=1" class="tt"></a>
                        </div>
                        <div class="footer-block footer-bottom">
                            <a href="index.php" class="logo" aria-label="Home Page">
                                <svg class="icon cover"><use xlink:href="#logo_green"></use></svg>
                            </a>
                            <p class="pc footer-address">
                                135 Central Park West<br />
                                New York, NY 10023 USA<br />
                                (717) 821-5356
                            </p>
                            <!-- <p class="pc footer-copyright">© 2023</p> -->
                        </div>
                    </div>
                </footer>
                <div class="popup">
                    <div class="popup-bg"></div>
                    <div class="popup-block">
                        <div class="popup-close">
                            <svg class="cover"><use xlink:href="#close"></use></svg>
                        </div>
                        <div class="popup-asset"><img class="cover" src="images/popup-bg.jpg" alt="Popup" /></div>
                        <div class="popup-info">
                            <h2 class="popup-title p7">Don't miss out.</h2>
                            <form class="subscribe-form" method="GET" name="Subscribe">
                                <input type="hidden" name="action" value="mail" />
                                <input type="hidden" name="type" value="subscribe" />
                                <div class="subscribe-content">
                                    <div class="form-group">
                                        <label class="p2 newsletter-label" for="newsletter_email">Subscribe to our newsletter for the latest from Atria.</label>
                                        <input class="newsletter-input p2" id="newsletter_email" name="from" type="email" placeholder="Enter your email here" required />
                                    </div>
                                    <div class="form-group"><button class="p2 subscribe-submit">Subscribe</button></div>
                                </div>
                                <p class="p2 contact-success">Thanks for signing up!</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- <script data-cfasync="false" src="cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script> -->
        <!-- <script src="dist/main.js"></script> -->
        <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
        <script src="dist/custom.js"></script>
        <script src="dist/main.js"></script>
        <script>
            $(document).ready(function(){
                if($(window).width() < 1024){
                    $(".mobile-personalized").insertBefore(".container-pasir");
                }
            })
        </script>
    </body>
</html>
