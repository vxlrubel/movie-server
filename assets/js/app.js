const App = Vue.createApp({
    data() {
        return {
            name: '',
            email: '',
            password: '',
            isAuthenticated: false,
            users: []
        };
    },
    mounted() {
        this.fetchUsers();
        this.checkLocalStorage();
    },
    methods: {
        fetchUsers() {
            fetch('./assets/data/data.json')
                .then(response => response.json())
                .then(data => {
                    this.users = data;
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        },
        login() {
            const user = this.users.find(u => u.email === this.email && u.password === this.password);
            if (user) {
                this.isAuthenticated = true;
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('email', this.email);
                localStorage.setItem('name', this.name);
            } else {
                alert("Invalid email or password!");
            }
        },
        logout() {
            this.isAuthenticated = false;
            this.email = '';
            this.password = '';
            this.name = '';
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('email');
            localStorage.removeItem('name');
        },
        checkLocalStorage() {
            if (localStorage.getItem('isAuthenticated')) {
                this.isAuthenticated = true;
                this.email = localStorage.getItem('email');
                this.name = localStorage.getItem('name');
            }
        }
    }
});

App.mount('#app');