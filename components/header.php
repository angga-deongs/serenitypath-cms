<?php
  $currentPage = basename($_SERVER['PHP_SELF'] ?? '');
  $desktopLogoHref = ($currentPage === 'contact.php') ? '#logo' : '#logo_green';
?>

<div class="menuMobile">
  <div class="menuMobile-content s">
    <div class="header">
      <div class="header-content s">
        <a href="index.php" class="logo sp-logo" aria-label="Home Page">
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
        <li class="menu-item"><a href="about.php" class="menu-link t5">About</a></li>
        <li class="menu-item"><a href="contact.php" class="menu-link t5">Contact</a></li>
      </ul>
    </nav>
  </div>
</div>

<header class="header">
  <div class="header-content s">
    <a href="index.php" class="logo sp-logo" aria-label="Home Page">
      <svg class="icon cover">
        <use xlink:href="<?php echo $desktopLogoHref; ?>"></use>
      </svg>
    </a>
    <nav class="menu">
      <ul class="menu-list">
        <li class="menu-item"><a href="index.php" class="menu-link sp-menu-link p">Serenity Path</a></li>
        <li class="menu-item"><a href="about.php" class="menu-link sp-menu-link p">About</a></li>
        <li class="menu-item"><a href="contact.php" class="menu-link sp-menu-link p">Contact</a></li>
      </ul>
    </nav>
    <div class="burger">
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</header>