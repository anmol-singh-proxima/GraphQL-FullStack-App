<!-- eslint-disable prettier/prettier -->
<template>
    <div id="tasks">
        <h3>All Tasks</h3>
        <div v-if="tasks" class="task-container">
            <div v-for="task in tasks" :key="task.task_id" class="task-card">
                <div class="key-value-pair">
                    <span class="property">Task Id: </span>
                    <span class="value">{{ task.task_id }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Title: </span>
                    <span class="value">{{ task.title }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Description: </span>
                    <span class="value">{{ task.description }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Status: </span>
                    <span class="value">{{ task.status }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Progress: </span>
                    <span class="value">{{ task.progress }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Priority: </span>
                    <span class="value">{{ task.priority }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Story Points: </span>
                    <span class="value">{{ task.story_points }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">User: </span>
                    <span class="value">{{ task.user_id }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Project: </span>
                    <span class="value">{{ task.project_id }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Start Date: </span>
                    <span class="value">{{ task.start_date }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">End Date: </span>
                    <span class="value">{{ task.end_date }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Assigned By: </span>
                    <span class="value">{{ task.assigned_by }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Created By: </span>
                    <span class="value">{{ task.created_by }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
    name: "GetTasks",
    data() {
        return {
            user: null,
            payload: null,
            tasks: null,
        }
    },
    created() {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        if (token && user) {
            this.user = user;
            this.getPayloadReady();
            this.getUserData(token);
        } else {
            console.log('[GetTasks.vue] User not Logged In');
            this.$router.push({ path: '/login' });
        }
    },
    methods: {
        getPayloadReady() {
            this.payload = {
                query: `
                query Query {
                    cts_task {
                        task_id
                        title
                        description
                        status
                        progress
                        priority
                        story_points
                        user_id
                        project_id
                        start_date
                        end_date
                        assigned_by
                        created_by
                    }
                }`,
            };
        },

        async getUserData(token) {
            return await axios({
                method: 'post',
                url: 'http://localhost:4000/graphql',
                responseType: 'json',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                data: this.payload,
            })
                .then((response) => {
                    console.log('[GetTasks.vue] response in retrieving tasks:', response);
                    this.tasks = response.data.data.cts_task;
                })
                .catch((error) => {
                    console.log('[GetTasks.vue] error.response:', error.response);
                    if (error.response) {
                        if (error.response.status === 401
                            && error.response.statusText === 'Unauthorized'
                            && error.response.data.code === 'UNAUTHORIZED') {
                            if (sessionStorage.getItem('token')) {
                                sessionStorage.removeItem('token');
                            }
                            if (sessionStorage.getItem('user')) {
                                sessionStorage.removeItem('user');
                            }
                            console.log('[GetTasks.vue] User got Logged Out');
                            this.$router.push({ path: '/login' });
                        }
                    }
                });
        },
    }
};
</script>

<!-- CSS Styling for Projects Component -->
<style scoped>
#tasks {
    display: block;
}

.task-container {
    display: block;
}

.task-card {
    /* display: flex;
    flex-wrap: wrap; */
    display: inline-block;
    padding: 10px;
    margin: 15px 15px 0 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 100%;
    /* height: 250px; */
    overflow-y: auto;
}

.task-card .key-value-pair {
    padding: 5px;
    display: block;
}

.task-card .property {
    display: inline-block;
    font-size: 1rem;
    line-height: 1.3;
    padding: 6px;
    font-weight: 600;
    width: 30%;
}

.task-card .value {
    display: inline-block;
    font-size: 1rem;
    line-height: 1.3;
    padding: 6px;
    width: 48%;
    margin-right: 20px;
}
</style>
