<template>
    <RouterView />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

#app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --tw-text-opacity: 1;
    color: #3d3d3d;
}


.hover\:bg-lightgreen:hover {
    --tw-bg-opacity: 1;
    background-color: #35c184;
}

.bgorange {
    --tw-bg-opacity: 1;
    background-color: #f7b34c;
}

.bgdarkorange {
    --tw-bg-opacity: 1;
    background-color: #d19132;
}

.hover\:bg-bgdarkorange:hover {
    --tw-bg-opacity: 1;
    background-color: #e8a643;
}

.hover\:bg-lightorange:hover {
    --tw-text-opacity: 1;
    background-color: #e8a643;
}

.hover\:text-lightorange:hover {
    --tw-text-opacity: 1;
    color: #e8a643;
}

.border-lightorange {
    --tw-border-opacity: 1;
    border-color: #d19132;
}

.hover\:border-lightorange:hover {
    --tw-border-opacity: 1;
    border-color: #d19132;
}

.hover\:border-teal:hover {
    --tw-border-opacity: 1;
    border-color: #43abab;
}

.border-teal {
    --tw-border-opacity: 1;
    border-color: #43abab;
}

.bgteal {
    --tw-bg-opacity: 1;
    background-color: #5AC3C3;
}

.hover\:bg-bgteal:hover {
    --tw-bg-opacity: 1;
    background-color: #43abab;
}
/* media */
@media (max-width: 1585px) {
    #imgsize {
        width: 18rem;
        height: 15rem;
    }
}
@media (min-width: 2300px) and (max-width: 9468px) {
    #profile-columns {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
}

@media (max-width: 2300px) {
    #profile-columns {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
}

@media (max-width: 1855px) {
    #profile-columns {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
}

@media (max-width: 1597px) {
    #profile-columns {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    #margin {
        margin-left: 2rem;
        margin-right: 2rem;
    }
}

@media (max-width: 1436px) {
    #to-row {
        display: flex;
        flex-direction: column;
        margin-top: 1.5rem;
    }

    #dogIMG {
        height: 50%;
    }

    #history {
        width: 100%
    }

    #shelterform {
        margin-left: 5rem;
        margin-right: 5rem;
    }

    #rehomed {
        grid-column: span 2 / span 2;
    }

    #gender {
        grid-column: span 2 / span 2;
    }

    #lvl {
        grid-column: span 3 / span 3;
    }
}

@media (max-width: 1213px) {
    #pxlg {
        padding-left: 1.9rem;
        padding-right: 1.9rem;
    }

    #card {
        max-width: 100%;
    }

    #minscreen {
        flex-direction: column;
    }
}

@media (max-width: 1367px) {
    #profile-columns {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}


@media (max-width: 1211px) {
    #profile-columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    #margin {
        margin-left: 2rem;
        margin-right: 2rem;
    }
}

@media (max-width: 1168px) {
    #pxlg {
        padding-left: 1.9rem;
        padding-right: 1.9rem;
    }

    #px {
        font-size: 11px;
        size: 4;
    }

    #card {
        max-width: 100%;
    }

    #minscreen {
        flex-direction: column;
    }
}

@media (max-width: 1024px) {
    #pxlg {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    #px {
        font-size: 11px;
        size: 4;
    }

    #feed {
        font-size: 13px;
    }

    #minscreen {
        flex-direction: row;
    }

    #shelterform {
        margin-left: 2rem;
        margin-right: 2rem;
    }

    #margin {
        margin-left: 5rem;
        margin-right: 5rem;
    }
}

@media (min-width: 632px) and (max-width: 768px) {
    #logotext {
        display: flex;
    }
}

@media (max-width: 1023px) {
    #profile-columns {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    #rehomed {
        grid-column: span 2 / span 2;
    }

    #gender {
        grid-column: span 2 / span 2;
    }

    #lvl {
        grid-column: span 3 / span 3;
    }

    #breed {
        grid-column: span 2 / span 2;
    }

    #anitype {
        grid-column: span 2 / span 2;
    }
}

@media (max-width: 845px) {
    #profile-columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 843px) {
    #minscreen {
        flex-direction: column;
    }

}

@media (min-width: 800px) and (max-width: 1017px) {
    #w-squares {
        width: 13rem;
    }
}

@media (max-width: 767px) {
    #rehomed {
        grid-column: span 3 / span 3;
    }

    #gender {
        grid-column: span 2 / span 2;
    }

    #lvl {
        grid-column: span 3 / span 3;
    }

    #breed {
        grid-column: 1 / -1;
    }

    #anitype {
        grid-column: span 3 / span 3;
    }

    #fur {
        grid-column: span 4 / span 4;
    }

    #age {
        grid-column: span 3 / span 3;
    }

    #size {
        grid-column: span 3 / span 3;
    }
}

@media (max-width: 764px) {
    #logotext {
        display: none;
    }

    #margin {
        margin-left: 2rem;
        margin-right: 2rem;
    }
}

@media (max-width: 639px) {
    #logotext {
        display: flex;
    }
}

@media (max-width: 616px) {
    #profile-columns {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

@media (max-width: 663px) {
    #rehomed {
        grid-column: 1 / -1;
    }

    #gender {
        grid-column: 1 / -1;
    }

    #lvl {
        grid-column: 1 / -1;
    }

    #breed {
        grid-column: 1 / -1;
    }

    #anitype {
        grid-column: 1 / -1;
    }

    #fur {
        grid-column: 1 / -1;
    }

    #age {
        grid-column: 1 / -1;
    }

    #size {
        grid-column: 1 / -1;
    }
}
</style>