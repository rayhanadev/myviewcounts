<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Custom Markdown View Counter</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <style>
      @import url("https://fonts.googleapis.com/css?family=Lato:300,400,700,900");
      @import url(https://fonts.googleapis.com/css?family=Pacifico);
      body {
        font-family: "Lato", Helvetica, Arial;
        font-size: 16px;
      }
      
      *, *:before, *:after {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        -webkit-border-sizing: border-box;
        -moz-border-sizing: border-box;
        border-sizing: border-box;
      }
      
      .container {
        width: 350px;
        margin: 50px auto;
      }
      .container > ul {
        list-style: none;
        padding: 0;
        margin: 0 0 20px 0;
      }
      
      .title {
        font-family: 'Pacifico';
        font-weight: normal;
        font-size: 40px;
        text-align: center;
        line-height: 1.4;
        color: #000;
      }
      
      .dropdown {
        position: relative;
      }
      .dropdown a {
        text-decoration: none;
      }
      .dropdown [data-toggle="dropdown"] {
        display: block;
        color: white;
        background: #000;
        -moz-box-shadow: 0 1px 0 #111 inset, 0 -1px 0 #222 inset;
        -webkit-box-shadow: 0 1px 0 #111 inset, 0 -1px 0 #222 inset;
        box-shadow: 0 1px 0 #111 inset, 0 -1px 0 #222 inset;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
        padding: 10px;
      }
      .dropdown [data-toggle="dropdown"]:hover {
        background: #111;
      }
      .dropdown [data-toggle="dropdown"]:before {
        position: absolute;
        display: block;
        content: '\25BC';
        font-size: 0.7em;
        color: #fff;
        top: 13px;
        right: 10px;
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        -moz-transition: -moz-transform 0.6s;
        -o-transition: -o-transform 0.6s;
        -webkit-transition: -webkit-transform 0.6s;
        transition: transform 0.6s;
      }
      .dropdown > .dropdown-menu {
        max-height: 0;
        overflow: hidden;
        list-style: none;
        padding: 0;
        margin: 0;
        -moz-transform: scaleY(0);
        -ms-transform: scaleY(0);
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
        -moz-transform-origin: 50% 0%;
        -ms-transform-origin: 50% 0%;
        -webkit-transform-origin: 50% 0%;
        transform-origin: 50% 0%;
        -moz-transition: max-height 0.6s ease-out;
        -o-transition: max-height 0.6s ease-out;
        -webkit-transition: max-height 0.6s ease-out;
        transition: max-height 0.6s ease-out;
        animation: hideAnimation 0.4s ease-out;
        -moz-animation: hideAnimation 0.4s ease-out;
        -webkit-animation: hideAnimation 0.4s ease-out;
      }
      .dropdown > input[type="checkbox"] {
        opacity: 0;
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      .dropdown > input[type="checkbox"]:checked ~ .dropdown-menu {
        max-height: 9999px;
        display: block;
        -moz-transform: scaleY(1);
        -ms-transform: scaleY(1);
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        animation: showAnimation 0.5s ease-in-out;
        -moz-animation: showAnimation 0.5s ease-in-out;
        -webkit-animation: showAnimation 0.5s ease-in-out;
        -moz-transition: max-height 2s ease-in-out;
        -o-transition: max-height 2s ease-in-out;
        -webkit-transition: max-height 2s ease-in-out;
        transition: max-height 2s ease-in-out;
      }
      .dropdown > input[type="checkbox"]:checked + a[data-toggle="dropdown"]:before {
        -moz-transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg);
        -moz-transition: -moz-transform 0.6s;
        -o-transition: -o-transform 0.6s;
        -webkit-transition: -webkit-transform 0.6s;
        transition: transform 0.6s;
      }

      input {
        color: #000;
        font-size: 13px;
        border: none;
        border-bottom: solid;
        border-bottom-color: #000;
        border-bottom-width: 2px;
        background: none;
      }
      
      input[type="submit"] {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
        text-align: center;
        color: #000;
        width: 100%;
        height: 35px;
        border: none;
        margin-top: 20px;
        padding-top: 5px;
      }
      
      .basicform {
        border: solid;
        border-width: 3px;
        border-color: #000;
        border-bottom: none;
      }
      
      .advancedform {
        border: solid;
        border-width: 3px;
        border-color: #000;
      }
      
      @keyframes showAnimation {
        0% {
          -moz-transform: scaleY(0.1);
          -ms-transform: scaleY(0.1);
          -webkit-transform: scaleY(0.1);
          transform: scaleY(0.1);
        }
        40% {
          -moz-transform: scaleY(1.04);
          -ms-transform: scaleY(1.04);
          -webkit-transform: scaleY(1.04);
          transform: scaleY(1.04);
        }
        60% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.04);
          -ms-transform: scaleY(1.04);
          -webkit-transform: scaleY(1.04);
          transform: scaleY(1.04);
        }
        100% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.02);
          -ms-transform: scaleY(1.02);
          -webkit-transform: scaleY(1.02);
          transform: scaleY(1.02);
        }
        100% {
          -moz-transform: scaleY(1);
          -ms-transform: scaleY(1);
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }
      }
      @-moz-keyframes showAnimation {
        0% {
          -moz-transform: scaleY(0.1);
          -ms-transform: scaleY(0.1);
          -webkit-transform: scaleY(0.1);
          transform: scaleY(0.1);
        }
        40% {
          -moz-transform: scaleY(1.04);
          -ms-transform: scaleY(1.04);
          -webkit-transform: scaleY(1.04);
          transform: scaleY(1.04);
        }
        60% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.04);
          -ms-transform: scaleY(1.04);
          -webkit-transform: scaleY(1.04);
          transform: scaleY(1.04);
        }
        100% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.02);
          -ms-transform: scaleY(1.02);
          -webkit-transform: scaleY(1.02);
          transform: scaleY(1.02);
        }
        100% {
          -moz-transform: scaleY(1);
          -ms-transform: scaleY(1);
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }
      }
      @-webkit-keyframes showAnimation {
        0% {
          -moz-transform: scaleY(0.1);
          -ms-transform: scaleY(0.1);
          -webkit-transform: scaleY(0.1);
          transform: scaleY(0.1);
        }
        40% {
          -moz-transform: scaleY(1.04);
          -ms-transform: scaleY(1.04);
          -webkit-transform: scaleY(1.04);
          transform: scaleY(1.04);
        }
        60% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.04);
          -ms-transform: scaleY(1.04);
          -webkit-transform: scaleY(1.04);
          transform: scaleY(1.04);
        }
        100% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.02);
          -ms-transform: scaleY(1.02);
          -webkit-transform: scaleY(1.02);
          transform: scaleY(1.02);
        }
        100% {
          -moz-transform: scaleY(1);
          -ms-transform: scaleY(1);
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }
      }
      @keyframes hideAnimation {
        0% {
          -moz-transform: scaleY(1);
          -ms-transform: scaleY(1);
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }
        60% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.02);
          -ms-transform: scaleY(1.02);
          -webkit-transform: scaleY(1.02);
          transform: scaleY(1.02);
        }
        100% {
          -moz-transform: scaleY(0);
          -ms-transform: scaleY(0);
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
        }
      }
      @-moz-keyframes hideAnimation {
        0% {
          -moz-transform: scaleY(1);
          -ms-transform: scaleY(1);
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }
        60% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.02);
          -ms-transform: scaleY(1.02);
          -webkit-transform: scaleY(1.02);
          transform: scaleY(1.02);
        }
        100% {
          -moz-transform: scaleY(0);
          -ms-transform: scaleY(0);
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
        }
      }
      @-webkit-keyframes hideAnimation {
        0% {
          -moz-transform: scaleY(1);
          -ms-transform: scaleY(1);
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
        }
        60% {
          -moz-transform: scaleY(0.98);
          -ms-transform: scaleY(0.98);
          -webkit-transform: scaleY(0.98);
          transform: scaleY(0.98);
        }
        80% {
          -moz-transform: scaleY(1.02);
          -ms-transform: scaleY(1.02);
          -webkit-transform: scaleY(1.02);
          transform: scaleY(1.02);
        }
        100% {
          -moz-transform: scaleY(0);
          -ms-transform: scaleY(0);
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="title">Custom View Counter</h1>
      <ul>
        <li class="dropdown">
          <input type="checkbox" />
          <a href="#" data-toggle="dropdown">Basic Counter</a>
          <ul class="dropdown-menu">
            <form id="basicForm" class="basicform">
              <label for="name">Counter Name: </label>
              <input name="name" placeholder="Name" type="text" />
              <br />
              <label for="password">Counter Password: </label>
              <input name="password" placeholder="Password" type="password" />
              
              <p>Preview: </p>
              <svg xmlns="http://www.w3.org/2000/svg" height="30" width="300">
                <style>
                  text {
                    font-family: Trebuchet MS, Helvetica;
                    font-size: 30px;
                    stroke-width: 1.5px;
                    fill: #FFF;
                    stroke: #000;
                    background-color: transparent;
                  }
                </style>
                <text x="3" y="28">
                  Total Views: 1000
                </text>
              </svg>
              
              <input type="submit" />
            </form>
          </ul>
        </li>
        <li class="dropdown">
          <input type="checkbox" />
          <a href="#" data-toggle="dropdown">Advanced Counter</a>
          <ul class="dropdown-menu">
            <form id="advancedForm" class="advancedform">
              <label for="name">Counter Name: </label>
              <input name="name" placeholder="Name" type="text" />
              <br />
              <label for="password">Counter Password: </label>
              <input name="password" placeholder="Password" type="password" />
              <br />
              <label for="stroke">Stroke Hex: </label>
              <input id="stroke" name="stroke" placeholder="Stroke" type="text" />
              <br />
              <label for="fill">Fill Hex: </label>
              <input id="fill" name="fill" placeholder="Fill" type="text" />
              <br />
              <label for="message">Message: </label>
              <input id="message" name="message" placeholder="Message" type="text" />
              
              <p>Preview: </p>
              <svg xmlns="http://www.w3.org/2000/svg" height="30" width="300">
                <style id="advancedStyle">
                  text {
                    font-family: Trebuchet MS, Helvetica;
                    font-size: 30px;
                    stroke-width: 1.5px;
                    fill: #FFF;
                    stroke: #000;
                    background-color: transparent;
                  }
                </style>
                <text x="3" y="28" id="advancedText">
                  Total Views: 1000
                </text>
              </svg>
              
              <input type="submit" />
            </form>
          </ul>
        </li>
      </ul>
    </div>
    <script>
      let fontFamily = "Trebuchet MS, Helvetica";
      let fontSize = "30px";
      let strokeWidth = "1.5px";
      let fill = "FFF";
      let stroke = "000";
      let backgroundColor = "transparent";
      
      let message = "Total Views";
      
      $('#basicForm').submit(e => {
        e.preventDefault();
        $.ajax({
          url: '/create',
          type: 'POST',
          data: $('#basicForm').serialize(),
          success: function(data) {
            alert(data);
          }
        });
      });

      $('#stroke').on('change', e => {
        stroke = $('#stroke').val();
        $('#advancedStyle').text(` text {
          font-family: ${fontFamily};
          font-size: ${fontSize};
          stroke-width: ${strokeWidth};
          fill: #${fill};
          stroke: #${stroke};
          background-color: ${backgroundColor};
        }`)
      });
      
      $('#fill').on('change', e => {
        fill = $('#fill').val();
        $('#advancedStyle').text(` text {
          font-family: ${fontFamily};
          font-size: ${fontSize};
          stroke-width: ${strokeWidth};
          fill: #${fill};
          stroke: #${stroke};
          background-color: ${backgroundColor};
        }`)
      });
      
      $('#message').on('change', e => {
        message = $('#message').val();
        $('#advancedText').text(`${message}: 1000`)
      });

      $('#advancedForm').submit(e => {
        e.preventDefault();
        $.ajax({
          url: '/create',
          type: 'POST',
          data: $('#advancedForm').serialize(),
          success: function(data) {
            alert(data);
          }
        });
      });
    </script>
  </body>
</html>
