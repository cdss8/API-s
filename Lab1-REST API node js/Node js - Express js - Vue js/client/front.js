import Vue from 'https://unpkg.com/vue@2.6.0/dist/vue.esm.browser.min.js'
console.log(Vue, "Connected to Vue")

new Vue ({
    el: '#app',
    data(){
        return{
            form:{
                wallet:'',
                password:''
            },
            users: []
        }
    },
    computed:{
        canCreate(){
            return this.form.wallet && this.form.password
        }
    },

    methods:{
        async createUser(){
            const {...user} = this.form 
            //console.log(user)
            
            const newUser = await request('api/users', 'POST', user)
           // console.log(newUser)
            this.users.push(newUser) 
           // this.users.push({...user, id:Date.now(), marked:false}) //reading and adding all the new users 
            this.form.wallet = this.form.password =''
          //  console.log('CreatedUser id= ', id)
        },

        async submitUser(id){
          //  console.log('SubmitedUser id', id) 
            await request(`api/users/${id}`,  'GET')
            const user = this.users.find(u => u.id === id)
          //  const user = this.users.find(u => u.id === id)
        },

        async removeUser(id){
          //  console.log('RemovedUser id =', id)
            await request(`api/users/${id}`,  'DELETE')
            this.users = this.users.filter(u => u.id !== id)
            //this.users = this.users.filter(u => u.id !== id)
        },

        async selectUser(id){
           // console.log('Selected id =', id)
            const user = this.users.find(u => u.id === id)
            const selectedUser = await request(`api/users/${id}`,  'PUT', {
            ...user,
            marked: true
        })
            user.marked = selectedUser.marked = true
        }
    },

    async mounted(){
        const data = await request ('/api/users')
        this.users = data
    }
})

async function request(url, method = 'GET', data = null){
    try {
        const headers = {}
        let body


        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)  /// for object realization 
        }
            
        const response = await fetch(url, { 
            method,
            headers,
            body,
        })  
        return await response.json()
    }
    catch(er) {console.warm('Error', e.message)}
}