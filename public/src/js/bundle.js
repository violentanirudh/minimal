const main = build('main', document.body, {class: 'container'})
const content = build('section', main, {class: 'content'})
const quotes = build('p', content, {class: 'quotes'})
const widget = build('div', content, {class: 'widget'})
const clock = build('h2', widget, {class: 'clock'})
const calendar = build('h2', widget, {class: 'calendar'})
build('p', calendar, {class: 'date'})
build('p', calendar, {class: 'day'})
const searchBar = build('form', content, {action: 'https://google.com/search', method: 'GET'})
const searchInput = build('input', searchBar, {name: 'q', placeholder: 'Search...', autocomplete: 'off'})

const cards = new Extensions(clock, calendar, quotes)
const tasks = new Tasks(build('tasks', main, {class: 'tasks'}), build)
const sites = new Sites(build('sites', content, {class: 'sites'}), build)


document.querySelectorAll('.tasks button').forEach((item) => {

})

document.querySelector('.taskinput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (event.target.value != '') {
      tasks.add(event.target.value)
      event.target.value = ''
    }
  }
});

document.querySelector('.sitebtn').addEventListener('click', (event) => {
  let site = document.querySelector('.sitetitle')
  let url = document.querySelector('.siteurl')
  if (site.value && url.value) {
    sites.add(site.value, url.value)
    site.value = ''
    url.value = ''
  }
});

document.querySelector('.addsitebtn').addEventListener('click', function(event) {
  document.querySelector('.addsite').classList.toggle('show')
  event.target.classList.toggle('cross')
})
