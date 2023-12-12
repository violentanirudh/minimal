class Extensions {

  constructor(clock, calendar, quotes) {

    this.clock(clock)
    this.calendar(calendar)
    this.quotes(quotes)

    setInterval(this.clock, 1000, clock)
    setInterval(this.calendar, 1000, calendar)

  }

  clock(element) {
    const today = new Date()
    let hours = today.getHours()
    let minutes = today.getMinutes()
    minutes = (minutes < 10) ? "0" + minutes : minutes
    element.innerText =  hours + ":" + minutes
  }

  calendar(element) {

    const dayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const monthArr =["January","February","March","April","May","June","July","August","September","October","November","December"];

    const date = new Date()
    let day = date.getDate()
    let month = monthArr[date.getMonth()]
    let year = date.getFullYear() - 2000

    element.querySelector('.date').innerText = `${day} ${month} ${year}`
    element.querySelector('.day').innerText = dayArr[date.getDay()]

  }

  quotes(element) {
    fetch("src/files/quotes.txt").then(async function (response) {
      let content = await response.text()
      content = content.split("\n")
      let length = 0
      while (content[length] != '') {
        length++
      }
      let random = Math.floor(Math.random() * length);
      element.innerText = content[random]
    }).catch((e) => console.log("Error Loading File", e))
  }

}

class Tasks {

  constructor(element, build) {
    this.element = element
    this.build = build
    this.tasks = JSON.parse(localStorage.getItem('tasks'))
    this.tasks = (this.tasks == null) ? {'items': 0} : this.tasks
    this.input = build('input', this.element, {type: 'text', class:'taskinput', placeholder: 'Tasks...'})
    this.container = build('div', this.element, {class: 'list'})
    this.load()
  }

  add(value) {
    let itemCount = parseInt(this.tasks.items) + 1
    this.tasks.items = itemCount
    this.tasks[itemCount] = value
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    this.load(itemCount, this.tasks[itemCount])
  }

  load(id = false, task = false) {
    if (id && task) {
      this.build('button', this.container, {id: id}, task).addEventListener('click', (element) => {
        tasks.remove(element.target.id, element.target)
      })
    } else {
      Object.keys(this.tasks).forEach(id => {
        if (id != 'items') {
          this.build('button', this.container, {id: id}, this.tasks[id]).addEventListener('click', (element) => {
            tasks.remove(element.target.id, element.target)
          })
        }
      })
    }
  }

  remove(id, task) {
    delete this.tasks[id]
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    task.remove()
  }

  clear() {
    this.tasks = {items: 0}
    localStorage.clear()
  }

}

class Sites {

  constructor(element, build) {
    this.element = element
    this.build = build
    this.sites = JSON.parse(localStorage.getItem('sites'))
    this.sites = (this.sites == null) ? {'items': 0} : this.sites
    this.container = this.build('div', this.element, {class: 'browse'})
    this.form = this.build('div', this.element, {class: 'addsite'})
    this.button = this.build('button', this.container, {class: 'addsitebtn'}, '+')
    this.init()
    this.load()
  }

  init() {
    this.build('input', this.form, {type: "text", placeholder: 'Title', class: 'sitetitle'})
    this.build('input', this.form, {type: "text", placeholder: 'URL', class: 'siteurl'})
    this.build('button', this.form, {class: 'sitebtn'}, 'Add Site')
  }

  add(title, url) {
    let itemCount = parseInt(this.sites.items) + 1
    this.sites.items = itemCount
    this.sites[itemCount] = [title, url]
    localStorage.setItem('sites', JSON.stringify(this.sites))
    this.load(title, url, itemCount)
  }

  load(title = false, url = false, id = false) {
    if (title && url && id) {
      this.build('a', this.container, {href: url, id: id, target: '_blank'}, title).addEventListener('contextmenu', function(element) {
          element.preventDefault();
          if (confirm(`Do you want to delete "${element.target.innerText}?"`)) {
            sites.remove(element.target.id, element.target)
          }
          return false
      }, false);
    } else {
      Object.keys(this.sites).forEach(id => {
        if (id != 'items') {
          this.build('a', this.container, {href: this.sites[id][1], id: id, target: '_blank'}, this.sites[id][0]).addEventListener('contextmenu', function(element) {
              element.preventDefault();
              if (confirm(`Do you want to delete "${element.target.innerText}?"`)) {
                sites.remove(element.target.id, element.target)
              }
              return false
          }, false);
        }
      })
    }
  }

  remove(id, sites) {
    delete this.sites[id]
    localStorage.setItem('sites', JSON.stringify(this.sites))
    sites.remove()
  }

  clear() {
    this.sites = {items: 0}
    localStorage.clear()
  }

}
