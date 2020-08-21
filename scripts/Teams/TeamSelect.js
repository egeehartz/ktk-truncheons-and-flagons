import { useTeams, getTeams } from "./TeamProvider.js";

const contentTarget = document.querySelector(".view2");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "goButton") {
    const select1 = document.querySelector(".teamSelect1");
    const select2 = document.querySelector(".teamSelect2");
    const select3 = document.querySelector(".teamSelect3");

    //conditional check for 3 unique ids
    const selectValues = [select1.value, select2.value, select3.value];
    let selectSet = new Set();
    selectValues.forEach((value) => {
      selectSet.add(value);
    });
    if (selectSet.size != 3 || selectSet.has("0")) {
      alert("please choose 3 unique teams!");
    } else {
      const AllTeamsSelected = new CustomEvent("AllTeamsSelected", {
        detail: {
          teamIds: [select1.value, select2.value, select3.value],
        },
      });
      eventHub.dispatchEvent(AllTeamsSelected);
    }
  }
});

const render = () => {
  const teamArr = useTeams();
  contentTarget.innerHTML = `
        <select class="teamSelect1">
            <option value=0>Please select a team...</option>
            ${teamArr.map((team) => {
              return `<option value="${team.id}">${team.name}</option>`;
            })}
        </select>
        <select class="teamSelect2">
            <option value=0>Please select a team...</option>
            ${teamArr.map((team) => {
              return `<option value="${team.id}">${team.name}</option>`;
            })}
        </select>
        <select class="teamSelect3">
            <option value=0>Please select a team...</option>
            ${teamArr.map((team) => {
              return `<option value="${team.id}">${team.name}</option>`;
            })}
        </select>
        <button id="goButton">Go To Game</button>
    `;
};

export const teamSelect = () => {
  getTeams().then(render);
};