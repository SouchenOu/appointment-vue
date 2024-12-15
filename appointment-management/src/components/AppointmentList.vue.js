import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
library.add(faEllipsisVertical);
export default defineComponent({
    name: 'AppointmentList',
    components: {
        FontAwesomeIcon
    },
    setup() {
        const store = useStore();
        const menuOpen = ref(null);
        onMounted(() => {
            store.dispatch('fetchAppointments');
        });
        const appointments = computed(() => store.getters.getAppointments);
        const convertTo24HourFormat = (time) => {
            const [hours, minutes, period] = time.split(/[:\s]/);
            let hours24 = parseInt(hours, 10);
            if (period.toLowerCase() === 'pm' && hours24 !== 12) {
                hours24 += 12;
            }
            else if (period.toLowerCase() === 'am' && hours24 === 12) {
                hours24 = 0;
            }
            return `${hours24.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        };
        const formatDate = (date) => {
            if (!date) {
                console.error("Invalid date format:", date);
                return "";
            }
            const isoDate = new Date(date);
            if (!isNaN(isoDate.getTime())) {
                return isoDate.toLocaleDateString('en-US');
            }
            const parts = date.split('/');
            if (parts.length === 3) {
                const [month, day, year] = parts;
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
            console.error("Unrecognized date format:", date);
            return "";
        };
        const sortedAppointments = computed(() => {
            return appointments.value
                .slice()
                .sort((a, b) => {
                const timeA = convertTo24HourFormat(a.time);
                const timeB = convertTo24HourFormat(b.time);
                const formattedDateA = formatDate(a.date);
                const formattedDateB = formatDate(b.date);
                if (!formattedDateA || !formattedDateB)
                    return 0;
                const dateA = new Date(formattedDateA);
                const dateB = new Date(formattedDateB);
                if (dateA.getTime() !== dateB.getTime()) {
                    return dateA.getTime() - dateB.getTime();
                }
                if (timeA !== timeB) {
                    return timeA.localeCompare(timeB);
                }
                return 0;
            });
        });
        const toggleMenu = (id) => {
            menuOpen.value = menuOpen.value === id ? null : id;
        };
        const editAppointment = (appointment) => {
            console.log('Edit Appointment:', appointment);
        };
        const deleteAppointment = (id) => {
            store.dispatch('deleteAppointment', id);
        };
        return {
            sortedAppointments,
            toggleMenu,
            editAppointment,
            deleteAppointment,
            menuOpen,
            formatDate
        };
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            FontAwesomeIcon
        },
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-7xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border border-gray-200") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/add-appointment"), }));
    const __VLS_2 = __VLS_1({ to: ("/add-appointment"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: ("flex items-center justify-center w-[250px] px-2 py-1 bg-blue-600 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 transition duration-300") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("mr-2") }, });
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-semibold text-center text-gray-800 mb-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("overflow-x-auto max-h-[700px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("min-w-full table-auto border-collapse text-gray-800") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({ ...{ class: ("sticky top-0 bg-gradient-to-r from-blue-200 to-blue-400 text-white z-10") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("px-6 py-4 text-left text-sm font-semibold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("px-6 py-4 text-left text-sm font-semibold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("px-6 py-4 text-left text-sm font-semibold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("px-6 py-4 text-left text-sm font-semibold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({ ...{ class: ("divide-y divide-gray-200") }, });
    for (const [appointment] of __VLS_getVForSourceType((__VLS_ctx.sortedAppointments))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((appointment.id)), ...{ class: ("hover:bg-gray-50") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("px-6 py-4 text-sm font-medium text-gray-700") }, });
        (appointment.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("px-6 py-4 text-sm font-medium text-gray-700") }, });
        (__VLS_ctx.formatDate(appointment.date));
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("px-6 py-4 text-sm font-medium text-gray-700") }, });
        (appointment.time);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("px-6 py-4 text-sm font-medium") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative inline-block text-left") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.toggleMenu(appointment._id);
                } }, ...{ class: ("text-gray-600 hover:text-gray-800 focus:outline-none") }, });
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.FontAwesomeIcon;
        /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ icon: ((['fas', 'ellipsis-vertical'])), ...{ class: ("h-5 w-5") }, }));
        const __VLS_8 = __VLS_7({ icon: ((['fas', 'ellipsis-vertical'])), ...{ class: ("h-5 w-5") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        if (__VLS_ctx.menuOpen === appointment._id) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-1") }, });
            const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
            /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ((`/edit-appointment/${appointment._id}`)), }));
            const __VLS_14 = __VLS_13({ to: ((`/edit-appointment/${appointment._id}`)), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.menuOpen === appointment._id)))
                            return;
                        __VLS_ctx.editAppointment(appointment);
                    } }, ...{ class: ("block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left rounded-md") }, });
            __VLS_nonNullable(__VLS_17.slots).default;
            var __VLS_17;
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.menuOpen === appointment._id)))
                            return;
                        __VLS_ctx.deleteAppointment(appointment._id);
                    } }, ...{ class: ("block px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-800 w-full text-left rounded-md") }, });
        }
    }
    __VLS_styleScopedClasses['max-w-7xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mt-12'];
    __VLS_styleScopedClasses['p-8'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-200'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['w-[250px]'];
    __VLS_styleScopedClasses['px-2'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['border-2'];
    __VLS_styleScopedClasses['border-blue-600'];
    __VLS_styleScopedClasses['hover:bg-blue-700'];
    __VLS_styleScopedClasses['hover:border-blue-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['mb-6'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['overflow-x-auto'];
    __VLS_styleScopedClasses['max-h-[700px]'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['min-w-full'];
    __VLS_styleScopedClasses['table-auto'];
    __VLS_styleScopedClasses['border-collapse'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['sticky'];
    __VLS_styleScopedClasses['top-0'];
    __VLS_styleScopedClasses['bg-gradient-to-r'];
    __VLS_styleScopedClasses['from-blue-200'];
    __VLS_styleScopedClasses['to-blue-400'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['divide-y'];
    __VLS_styleScopedClasses['divide-gray-200'];
    __VLS_styleScopedClasses['hover:bg-gray-50'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['hover:text-gray-800'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-40'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['ring-1'];
    __VLS_styleScopedClasses['ring-black'];
    __VLS_styleScopedClasses['ring-opacity-5'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['hover:bg-gray-100'];
    __VLS_styleScopedClasses['hover:text-gray-900'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['hover:bg-red-100'];
    __VLS_styleScopedClasses['hover:text-red-800'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['rounded-md'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
