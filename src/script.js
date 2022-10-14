//=========DATA==================//
const DB_Quis = [
  {
    pertanyaan: "Dari 25 nabi, Nabi Keberapa Ibrahim?",
    pilihan: ["Nabi Ke 5", "Nabi Ke 6", "Nabi Ke 4", "Nabi Ke 7"],
  },
  {
    pertanyaan: "Nabi Muhammad SAW Dilahirkan di kota.....?",
    pilihan: ["Madinah", "Tharim", "Mekah", "Tokyo"],
  },
  {
    pertanyaan: "Pada Tanggal Berapa Nabi Muhammad Dilahirkan?",
    pilihan: ["12 Robiul Awal", "13 Muharam", "12 Robiul Akhir", "17 Romadhon"],
  },
  {
    pertanyaan: "Siapakah Istri Pertama Rosulullah?",
    pilihan: ["Aisyah", "Fatimah", "Khodijah", "Asiyah"],
  },
  {
    pertanyaan: "Rukun Wudhu Yang Ke 3 Adalah...",
    pilihan: ["Membasuh Tangan", "Niat", "Membasuh Kaki", "Tertib"],
  },
  {
    pertanyaan: "Rukun Wudhu Ada Berapa Perkara?",
    pilihan: ["Tujuh", "Sembilan", "Enam", "Lima"],
  },
  {
    pertanyaan: "Pada Bulan apa terjadi perang uhud?",
    pilihan: ["Romadhon", "Muharam", "Robiul Awal", "Syawal"],
  },
  {
    pertanyaan: "Rosullullah meninggal di kota?",
    pilihan: ["Jakarta", "Mekah", "Madinah", "Wakanda"],
  },
  {
    pertanyaan:
      "Perang Tabuk merupakan perang antara tentara Muslim melawan....",
    pilihan: ["Kaum komunis", "Kaum Qurais", "Kaum Romawi", "Kaum israel"],
  },
  {
    pertanyaan: "Rukun Haji Ada Berapa?",
    pilihan: ["Satu", "Dua", "Tujuh", "Lima"],
  },
];
const jawaban = [1, 2, 0, 2, 0, 2, 3, 2, 2, 3];

//=========SETUP QUESTION==================//
let count = 0;
// let simpan_jwb = [];
let total_score = 0;

document.addEventListener("DOMContentLoaded", function () {
  Quis();
});

const Quis = function () {
  const question = document.getElementById("pertanyaan");
  const button = [...document.querySelectorAll(".style-button")];
  question.innerHTML = DB_Quis[count].pertanyaan;
  for (let i = 0; i < DB_Quis.length; i++) {
    button[i].innerHTML = DB_Quis[count].pilihan[i];
  }
};

const nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", () => {
  count++;
  if (count > DB_Quis.length - 1) {
    stopQuis();
    return;
  }
  resetBackground();
  Quis();
});

const button = [...document.querySelectorAll(".style-button")];
let clickCount = 1;
for (let index = 0; index < button.length; index++) {
  button[index].addEventListener("click", (e) => {
    if (e.target.innerHTML == DB_Quis[count].pilihan[jawaban[count]]) {
      total_score += 100;
    } else {
      total_score = total_score;
    }
    if (clickCount == 1) {
      e.target.style.backgroundColor = "green";
    }
    clickCount++;
  });
}

function resetBackground() {
  const button = [...document.querySelectorAll(".style-button")];
  for (let index = 0; index < button.length; index++) {
    button[index].style.backgroundColor = "red";
    clickCount = 1;
  }
}

const startingMinutes = 1;
let time = startingMinutes * 60;
let result = "";
const countDownd = document.getElementById("countdown");
const playGame = document.getElementById("play");

let namapemain = "";
function navigasi() {
  const welcomeGame = document.getElementById("welcome");
  const quisMulai = document.getElementById("quis");
  const inputNama = document.querySelector("input");
  const audioPlay = document.getElementById("audio");
  if (inputNama.value == "") {
    namapemain = "Anonim";
  } else {
    namapemain = inputNama.value;
  }

  welcomeGame.classList.add("hiden-Model");
  quisMulai.classList.remove("hidden");
  audioPlay.classList.remove("hidden");
  audioPlay.play();
}
playGame.addEventListener("click", () => {
  // audioPlay.setAttributeNode("autoplay");
  navigasi();
  const interval = setInterval(updateCountDownd, 1000);
  function updateCountDownd() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countDownd.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time < 0) {
      clearTimeout(interval);
      bel.pause();
      stopQuis();
    }
  }
  countDownd.classList.add("border-r-2");
});

function finisedGame() {
  const akhirGame = document.getElementById("akhir-game");
  const audioPlay = document.getElementById("audio");
  const header = document.querySelector("header");
  const section = document.querySelector("section");
  const userGame = document.querySelector("#nama-pemain");
  const totalScore = document.querySelector("#Score");

  kategori();
  akhirGame.classList.remove("hidden");
  audioPlay.pause();
  audioPlay.classList.add("hidden");
  header.classList.add("hidden");
  section.classList.add("hidden");
  userGame.innerHTML = namapemain;
  totalScore.innerHTML = ` Dengan Score : <span>${total_score}</span> dari ${DB_Quis.length} Pertanyaan
  ${result}`;
}

function kategori() {
  if (total_score > 800) {
    result = "Pengetahuan Islam Anda Luar Biasa";
    return;
  } else if (total_score > 500 && total_score <= 800) {
    result = "Terus Semangat Untuk Belajar";
    return;
  } else {
    result = "Masya allah.... Bimbingan Dengan ustad yuk ";
    return;
  }
}

function stopQuis() {
  finisedGame();
}
