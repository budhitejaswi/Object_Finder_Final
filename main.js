status_1 = "";
video = "";
object = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 340);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 340);
    video.hide();
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_model").innerHTML = "Status - Detecting Objects";
    object = document.getElementById("object_name").value;
    console.log(object);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded() {
    console.log("Model Loaded :)");
    status_1 = true;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status_1 != "") {
        object_detector.detect(video, gotResults)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status_model").innerHTML = "Status = Object Detected";
            document.getElementById("status_object").innerHTML = "Number of Objects Detected Are = " + objects.length;
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "% ", objects[i].x + 15, objects[i].y);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label = object) {
                video.stop();
                object_detector.detect(gotResults)
                document.getElementById("status_object").innerHTML = object + "  Found";
                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(object + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("status_object").innerHTML = object + "  Not Found";
            }

        }
    }
}