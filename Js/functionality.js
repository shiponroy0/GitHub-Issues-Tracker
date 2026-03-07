const cardContainer = document.getElementById('CardContainers');
const getIssuesCount = document.getElementById('issuesCount');
const getSearchInputValue = document.getElementById('searchInputValue');
const getLoadingSection = document.getElementById('loadingSection');
const modalContent = document.getElementById('modalContent');
let allIssues = [];

// loading Function
const loadingEffect = status => {
  if (status) {
    getLoadingSection.classList.remove('hidden');
    cardContainer.classList.add('hidden');
  } else {
    getLoadingSection.classList.add('hidden');
    cardContainer.classList.remove('hidden');
  }
};

// Button Toggle Function
const buttonToggle = id => {
  const allButton = document.querySelectorAll('.btnAll');
  allButton.forEach(btn => {
    btn.classList.remove('btn-primary');
  });

  // active button
  if (id === 'allButton') {
    document.getElementById('allButton').classList.add('btn-primary');
  } else if (id === 'openButton') {
    document.getElementById('openButton').classList.add('btn-primary');
  } else if (id === 'ClosedButton') {
    document.getElementById('ClosedButton').classList.add('btn-primary');
  }
};

// All Issues Data Fetch
const allIssuesDataFetch = async () => {
  loadingEffect(true);
  setTimeout(async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    allIssues = data.data;
    displayAllIssuesData(allIssues);
    loadingEffect(false);
  }, 100);
};

// Card Show Data
const displayAllIssuesData = data => {
  loadingEffect(true);
  cardContainer.innerHTML = '';
  modalContent.innerHTML = '';

  const priorityColor = {
    high: 'bg-red-500/10 text-red-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    low: 'bg-[#EEEFF2] text-[#9CA3AF]',
  };

  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `bg-white border-t-4 transition duration-300 hover:-translate-y-1 cursor-pointer 
     ${item.status === 'open' ? 'border-success' : 'border-[#A855F7]'} px-5 py-4 rounded-lg cardCustomShadow space-y-3`;

    // Click To Open Modal
    itemDiv.addEventListener('click', () => {
      const modal = document.getElementById('my_modal_4');

      showModalDataFetch(item.id);

      modal.showModal();
    });

    // Card Render
    itemDiv.innerHTML = `

                <div class="border-b border-gray-200 space-y-2">

              <!-- Status High medium Low -->
              <div class="flex items-center justify-between">

                <!-- image icons -->
                <div>
                  <img src="${item?.status === 'open' ? '../assets/Open-Status.png' : '../assets/Closed- Status .png'}" alt="icons">
                </div>

                <!-- status -->
                <div>
                  <h4 class="${priorityColor[item?.priority]} uppercase text-lg font-medium max-w-max px-8 py-1 rounded-full
                   ">${item?.priority}</h4>
                </div>


              </div>


              <!-- card Details -->
              <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-headingColor">${item?.title}</h2>
                <p class="text-paragraphColor line-clamp-2"> ${item?.description}
                </p>
              </div>

              <!-- Help Bug Wanted -->
              <div class="flex items-center gap-2 pb-2">

                <!-- Bug -->
                <div
                  class="bg-readColor/10 max-w-max px-3 py-1 rounded-full gap-1 flex items-center border border-readColor/30">
                  <img src="../assets/icons/BugDroid.png" alt="icons" class="">
                  <h2 class="text-readColor text-[13px] uppercase">${item?.labels?.[0] || 'N/A'}</h2>
                </div>

                <!-- help wanted -->
                <div
                  class=" max-w-max px-3 py-1 rounded-full flex items-center border ${
                    item?.labels?.[1] === 'enhancement'
                      ? 'bg-[#BBF7D0]/25 border-[#00A96E]/20'
                      : 'bg-warningLight/80 border-warningColor'
                  }">
                  <img src="${item?.labels[1] === 'enhancement' ? '../assets/icons/Sparkle.png' : '../assets/icons/Lifebuoy.png'}" alt="icons" >
                  <h2 class="${
                    item?.labels[1] === 'enhancement'
                      ? 'text-success bg-[#BBF7D0]'
                      : 'text-warningColor'
                  } badge text-[13px] uppercase">${item?.labels?.[1] || 'N/A'}</h2>
                </div>


              </div>

            </div>

            <div class="text-paragraphColor">
              <h2>${item.author}</h2>
              <p>${new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
    
    `;

    // Count Issues And AppendChild
    getIssuesCount.innerHTML = `${allIssues.length} Issues`;
    cardContainer.appendChild(itemDiv);
  });

  loadingEffect(false);
};

// Open Button Filter
const showOpenIssues = () => {
  loadingEffect(true);
  setTimeout(() => {
    const openData = allIssues.filter(item => item.status === 'open');
    displayAllIssuesData(openData);
    getIssuesCount.innerHTML = `${openData.length} Issues`;
    buttonToggle('openButton');
    loadingEffect(false);
  }, 100);
};

// Closed Button Filter
const showClosedIssues = () => {
  loadingEffect(true);
  setTimeout(() => {
    const closedData = allIssues.filter(item => item.status === 'closed');
    displayAllIssuesData(closedData);
    getIssuesCount.innerHTML = `${closedData.length} Issues`;
    buttonToggle('ClosedButton');
    loadingEffect(false);
  }, 100);
};

// All Button Filter
const showAllIssues = () => {
  loadingEffect(true);
  setTimeout(() => {
    getIssuesCount.innerHTML = `${allIssues.length} Issues`;
    displayAllIssuesData(allIssues);
    buttonToggle('allButton');
    loadingEffect(false);
  }, 100);
};

// Search Issues System Add
const searchIssues = async () => {
  loadingEffect(true);
  const searchText = getSearchInputValue.value.toLowerCase();

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();

  displayAllIssuesData(data.data);
  getIssuesCount.innerHTML = `${data.data.length} Issues`;
  buttonToggle('');
  loadingEffect(false);
};

// Modal Data fetch
const showModalDataFetch = async id => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showModalDataDisplay(data.data);
};

const showModalDataDisplay = data => {
  const priorityColor = {
    high: 'bg-red-500/10 text-red-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    low: 'bg-[#EEEFF2] text-[#9CA3AF]',
  };

  modalContent.innerHTML = `
      
      
                <!-- details -->
          <div class=" space-y-4 w-full">

            <div class="space-y-2">
              <!-- title -->
              <div>
                <h3 class="text-2xl font-bold">${data.title}</h3>
              </div>

              <!-- status and author -->
              <div>
                <ul class="flex items-center gap-2">
                  <li class="list-none ${
                    data.status === 'open'
                      ? 'bg-greenColor text-white'
                      : 'bg-[#A855F7] text-white'
                  } text-sm font-medium px-2 py-0.5 rounded-full capitalize">${data?.status}
                  </li>
                  <li class="before:content-[''] before:text-paragraphColor before:mr-1">${data.author}</li>
                  <li class="before:content-[''] before:text-paragraphColor before:mr-1">${new Date(
                    data.updatedAt,
                  ).toLocaleDateString()}</li>
                </ul>
              </div>
            </div>

            <!-- bug -->
            <div class="flex gap-2 items-center">

              <!-- 1 -->
              <div
                class="bg-readColor/10 max-w-max px-3 py-1 rounded-full gap-1 flex items-center border border-readColor/30">
                <img src="../assets/icons/BugDroid.png" alt="icons" class="">
                <h2 class="text-readColor text-[13px] uppercase">${data?.labels?.[0] || 'N/A'}</h2>
              </div>

              <!-- help wanted 2-->
              <div class=" max-w-max px-3 py-1 rounded-full flex items-center border ${
                data?.labels[1] === 'enhancement'
                  ? 'bg-[#BBF7D0]/25 border-[#00A96E]/20'
                  : 'bg-warningLight/80 border-warningColor'
              }">
                <img
                  src="${data?.labels[1] === 'enhancement' ? '../assets/icons/Sparkle.png' : '../assets/icons/Lifebuoy.png'}"
                  alt="icons">
                <h2 class="${
                  data?.labels[1] === 'enhancement'
                    ? 'text-success bg-[#BBF7D0]'
                    : 'text-warningColor'
                } badge text-[13px] uppercase">${data?.labels?.[1] || 'N/A'}</h2>
              </div>


            </div>

            <!-- subtitle -->
            <div>
              <p class="text-paragraphColor">${data?.description}</p>
            </div>

            <!-- Assignee: Priority: -->
            <div class="flex items-center justify-between bg-[#F8FAFC] px-4 py-2 rounded-lg">

              <!-- Assignee -->
              <div class="space-y-2">
                <p class="text-paragraphColor">Assignee:</p>
                <h2>${data?.assignee}</h2>
              </div>

              <!-- Priority:  -->
              <div class="space-y-2">
                <p class="text-paragraphColor">Priority:</p>
                <h2 class="${priorityColor[data?.priority]} py-0.5 px-4 rounded-full max-w-max uppercase">${data.priority}</h2>
              </div>

              <div></div>

            </div>

          </div>

          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button, it will close the modal -->
              <button class="btn btn-primary outline-none">Close</button>
            </form>
          </div>
      
      `;
};

allIssuesDataFetch();
