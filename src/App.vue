<template>
    <div id="app">
        <header>
            <div class="column">
                <span class="left-menu">
                </span>
                <span class="middle-menu">
                </span>
                <span class="right-menu">
                </span>
            </div>
        </header>
        <router-view></router-view>
        <footer>
            <div class="column">
                <div class="footer-left">
                    d.kollerov
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'app'
    };
</script>

<style>
    @font-face{
        font-family: "Buran";
        src: local("Buran USSR"), url('./assets/fonts/Buran USSR.ttf') format('truetype');
    }

    @font-face {
        font-family: "Mustica";
        src: local("MusticaPro-SemiBold"), url('./assets/fonts/MusticaPro-SemiBold.otf') format('opentype');
    }

    html {
        height: 100%;
        color: white;
        font-family: Mustica;
        font-size: 14px;
    }

    h1, h2, h3, h5, h6 {
        font-family: Buran, Arial;
    }

    h1, h2 {
        text-align: center;
    }

    h1 {
        font-size: 30px;
    }

    h2 {
        font-size: 28px;
    }

    h4 {
        font-size: 26px;
    }

    h5 {
        font-size: 22px;
    }

    h6 {
        font-size: 20px
    }

    hr {
        color: white;
    }

    body {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: #826c55;
    }

    a {
        color: #5e4226;
    }

    a:visited {
        color: #2f2014;
    }

    div#app {
        min-height: 100%;
        display: flex;
        flex-direction:column;
        height: 100%;
    }

    header {
        width: 100%;
        height: 40px;
        background-color: #5e4226;
        font-family: Buran;
        font-size: 24px;
    }

    header .left-menu, header .right-menu {
        width: calc((100% - 40px) / 2);
        display: inline-flex;
    }

    header .right-menu {
        flex-direction: row-reverse;
    }

    header .middle-menu {
        width: 40px;
        display: inline-block;
    }

    header a, header a:visited {
        color: white;
        text-decoration: none;
        margin-left: 7px;
        margin-right: 7px;
        text-shadow: 0px 0px 6px #2f2014;
    }

    header a:hover {

    }

    header a.router-link-active {
        text-shadow: 0px 0px 6px white;
        color: #2f2014;
    }

    .column {
        margin-left: 150px;
        margin-right: 150px;
    }

    .background {
        background-color: #baa48f;
        padding-top: 2px;
        padding-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
        color: #2f2014;
    }

    footer {
        display: flex;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-top: auto;
        align-self: flex-end;
        width: 100%;
        height: min-content;
        background-color: #5e4226;
    }

    footer .footer-left {
        
    }
</style>

