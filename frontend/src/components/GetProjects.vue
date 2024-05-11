<!-- eslint-disable prettier/prettier -->
<template>
    <div id="projects">
        <h3>All Projects</h3>
        <div v-if="projects">
            <div v-for="project in projects" :key="project.project_id" class="project-card">
                <div class="key-value-pair">
                    <span class="property">Project Id: </span>
                    <span class="value">{{ project.project_id }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Release: </span>
                    <span class="value">{{ project.release }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Title: </span>
                    <span class="value">{{ project.title }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Description: </span>
                    <span class="value">{{ project.description }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Status: </span>
                    <span class="value">{{ project.status }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Progress: </span>
                    <span class="value">{{ project.progress }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Project Manager: </span>
                    <span class="value">{{ project.project_manager }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Project Lead: </span>
                    <span class="value">{{ project.project_lead }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Start Date: </span>
                    <span class="value">{{ project.start_date }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">End Date: </span>
                    <span class="value">{{ project.end_date }}</span>
                </div>
                <div class="key-value-pair">
                    <span class="property">Created By: </span>
                    <span class="value">{{ project.created_by }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
    name: "GetProjects",
    data() {
        return {
            user: null,
            projects: null,
        }
    },
    created() {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        if(!token && !user) {
            console.log("User not Logged In");
            this.$router.push({ path: '/login' });
        }
        this.user = user;
        this.getPayloadReady(token);
        this.getUserData();
    },
    methods: {
        getPayloadReady(token) {
            this.payload = {
                query: `
                query Query {
                    cts_project {
                        project_id
                        release
                        title
                        description
                        status
                        progress
                        project_manager
                        project_lead
                        start_date
                        end_date
                        created_by
                    }
                }`,
            };
        },

        async getUserData() {
            return await axios({
                method: 'post',
                url: 'http://localhost:4000/graphql',
                responseType: 'json',
                headers: {
                    'Access-Control-Aloww-Origin': '*',
                    'Content-type': 'application/json',
                },
                data: this.payload,
            })
            .then((response) => {
                console.log("Response in retrieving Projects:", response);
                this.projects = response.data.data.cts_project;
            })
            .catch((error) => {
                console.log("Error while retrieving Projects:", error);
            });
        },
    }
};
</script>

<!-- CSS Styling for Projects Component -->
<style scoped>
#projects {
    display: block;
}
.project-card {
    /* display: flex;
    flex-wrap: wrap; */
    display: inline-block;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid #ddd;
    width: 100%;
    /* height: 250px; */
    overflow-y: auto;
}
.project-card .key-value-pair {
    padding: 5px;
    display: block;
}
.project-card .property {
    display: inline-block;
    font-size: 1rem;
    line-height: 1.3;
    padding: 6px;
    font-weight: 600;
    width: 30%;
}
.project-card .value {
    display: inline-block;
    font-size: 1rem;
    line-height: 1.3;
    padding: 6px;
    width: 48%;
    margin-right: 20px;
}
</style>