var timerInterval;
var hours = 0;
var minutes = 0;
var seconds = 0;
var isPlayingSound = false;
var isPaused = false;
var recordedTimes = [];
var musicOption = localStorage.getItem('selectedOption');
var audio = new Audio(musicOption);
var pauseButton = document.getElementById('pauseButton');
var volumeSlider = document.getElementById('volumeSlider');

audio.autoplay = true;

$("#studyTable").append("<tr><th>已進行時長</th><th>項目</th></tr>");
// $("#studyTable").append("<tr>"+`<td>${"已學習時間長"}</td>`+`<td>${"科目"}</td>`+"</tr>")

// 重新開始計時
function toggleTimer() {
    if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    } else {
    timerInterval = setInterval(updateTimer, 1000);
    }
}

// 時間更新
function updateTimer() {
    if (!isPaused) {
        seconds++;

        if (seconds === 60) {
        minutes++;
        seconds = 0;
        }

        if (minutes === 60) {
        hours++;
        minutes = 0;
        }

        if (seconds % 10 === 0) {
        if (!isPlayingSound) {
            playSound();
            isPlayingSound = true;
            setTimeout(function() {
            playSound();
            isPlayingSound = false;
            }, 2000);
        }
    }
    }

    var timeString = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    document.getElementById('timer').innerText = timeString;
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// 暫停按鈕
function pauseTimer() {
    isPaused = !isPaused;
    var pauseButton = document.getElementById('pauseButton');
    if (isPaused) {
    pauseButton.innerHTML = '繼續';
    audio.pause();
    } else {
    pauseButton.innerHTML = '暫停';
    audio.play();
    }
}

// 結束按鈕
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    var select = document.getElementById("options");
    var selectedOption = select.options[select.selectedIndex].value;

    var recordedTime = "已學習時間：" + formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + "科目：" + selectedOption;

    $("#studyTable").append("<tr>"+`<td>${formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds)}</td>`+`<td>${selectedOption}</td>`+"</tr>")

    var tables = document.getElementById("studyTable")
    for(var x=0;x<=recordedTimes.length;x++){
        if (x % 2 == 0){
            tables.rows[x+1].style.backgroundColor = "#d5e3cf";
        }
        else{
            tables.rows[x+1].style.backgroundColor = "#e9f2e4";
        }
    }

    recordedTimes.unshift(recordedTime);
    hours = 0;
    minutes = 0;
    seconds = 0;
    isPaused = false;
    document.getElementById('pauseButton').innerHTML = '繼續';
    document.getElementById('timer').innerText = '00:00:00';
    isPaused = !isPaused;
    audio.pause();
    toggleTimer();
}

// 顯示時間
function exportTime() {
    var timeString = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    var csvContent = 'data:text/csv;charset=utf-8,' + timeString + '\n';
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'time.csv');
    document.body.appendChild(link);
    link.click();
}

// 顯示時間
function getRecordedTimesHTML() {
    var html = '';
    for (var i = 0; i < recordedTimes.length; i++) {
    html += '<div>' + recordedTimes[i] + '</div>';
    }
    return html;
}

document.getElementById('options').addEventListener('change', function() {
    var selectedOption = this.value;
});

// 啟動網頁
document.addEventListener('DOMContentLoaded', function() {
    toggleTimer(); // 啟動計時器
    audio.play();
});

// 點選新增科目，會出現一個輸入欄
function showAddNewOptionInput() {
    document.getElementById('newOptionInput').style.display = 'inline-block';
    document.getElementById('addNewOptionBtn').style.display = 'inline-block';
    document.getElementById('options').selectedIndex = -1;
}

// 輸入新增科目按確定
function addNewOption() {
    var newOptionValue = document.getElementById('newOptionInput').value;
    if (newOptionValue !== '') {
      var newOption = document.createElement('option');
      newOption.value = newOptionValue;
      newOption.innerText = newOptionValue;
      var selectElement = document.getElementById('options');
      selectElement.insertBefore(newOption, selectElement.lastElementChild);
      selectElement.value = newOptionValue; // 設定新選項為選中項目
      document.getElementById('newOptionInput').style.display = 'none';
      document.getElementById('addNewOptionBtn').style.display = 'none';
      document.getElementById('newOptionInput').value = '';
    }
  }
  

// 點選新增科目
document.getElementById('options').addEventListener('change', function() {
    var selectedOption = this.value;
    if (selectedOption === 'addNew') {
    showAddNewOptionInput();
    }
});

// 新增選項
document.getElementById('addNewOptionBtn').addEventListener('click', function() {
    addNewOption();
});


// TODOLIST /////////////////////////////////////////////////////////

var totalTasks = 0;
var completedTasks = 0;
var progressBar = document.getElementById('progress-bar');

function addTask() {
    var input = document.getElementById('new-task-input');
    var task = input.value.trim();

    if (task !== '') {
        var list = document.getElementById('todo-list');
        var newItem = document.createElement('li');
        newItem.classList.add('task-item');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', toggleTaskStatus);
        var label = document.createElement('label');
        label.textContent = task;
        label.addEventListener('dblclick', deleteTask);

        newItem.appendChild(checkbox);
        newItem.appendChild(label);
        list.appendChild(newItem);

        totalTasks++;
        progressBar.max = totalTasks;

        input.value = '';
    }
}

function toggleTaskStatus(event) {
    var checkbox = event.target;
    var label = checkbox.nextElementSibling;

    if (checkbox.checked) {
        label.classList.add('completed');
        completedTasks++;
    } else {
        label.classList.remove('completed');
        completedTasks--;
    }

    progressBar.value = completedTasks;
}

function deleteTask(event) {
    var label = event.target;
    var listItem = label.parentNode;
    var list = listItem.parentNode;
    list.removeChild(listItem);

    totalTasks--;
    progressBar.max = totalTasks;

    if (label.classList.contains('completed')) {
        completedTasks--;
        progressBar.value = completedTasks;
    }
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        addTask();
        event.preventDefault(); // 阻止 Enter 鍵預設的換行行為
    }
}

window.addEventListener('DOMContentLoaded', function() {
    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
    });
});