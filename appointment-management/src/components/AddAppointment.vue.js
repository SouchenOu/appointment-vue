import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    name: 'AddAppointment',
    setup() {
        const store = useStore();
        const appointment = ref({
            title: '',
            date: '',
            hour: '',
            minute: '',
            meridiem: 'AM',
        });
        const errors = ref({
            title: '',
            date: '',
            time: '',
        });
        const validateForm = () => {
            let isValid = true;
            errors.value = { title: '', date: '', time: '' };
            // Validate Title
            if (!appointment.value.title.trim()) {
                errors.value.title = 'Title is required.';
                isValid = false;
            }
            // Validate Date
            if (!appointment.value.date) {
                errors.value.date = 'Date is required.';
                isValid = false;
            }
            else if (!/^\d{4}-\d{2}-\d{2}$/.test(appointment.value.date)) {
                errors.value.date = 'Date must be in YYYY-MM-DD format.';
                isValid = false;
            }
            if (!appointment.value.hour || !appointment.value.meridiem) {
                errors.value.time = 'Complete time is required.';
                isValid = false;
            }
            else {
                const hour = Number(appointment.value.hour);
                const minute = Number(appointment.value.minute);
                if (isNaN(hour) ||
                    isNaN(minute) ||
                    hour < 1 ||
                    hour > 12 ||
                    minute < 0 ||
                    minute > 59) {
                    errors.value.time = 'Invalid time. Ensure hour is 1-12 and minute is 0-59.';
                    isValid = false;
                }
            }
            return isValid;
        };
        const submitForm = async () => {
            if (!validateForm())
                return;
            const formattedTime = `${appointment.value.hour}:${appointment.value.minute} ${appointment.value.meridiem}`;
            const newAppointment = {
                title: appointment.value.title,
                date: appointment.value.date,
                time: formattedTime,
            };
            try {
                await store.dispatch('createAppointment', newAppointment);
                appointment.value = { title: '', date: '', hour: '', minute: '', meridiem: 'AM' };
            }
            catch (error) {
                console.error('Error creating appointment:', error);
            }
        };
        return {
            appointment,
            errors,
            submitForm,
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-2xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-lg") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-4xl font-bold text-center text-gray-800 mb-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.submitForm) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 gap-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("title"), ...{ class: ("block text-lg font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.appointment.title)), id: ("title"), type: ("text"), ...{ class: ("mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, placeholder: ("Enter appointment title"), });
    if (__VLS_ctx.errors.title) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-red-500 text-sm mt-2") }, });
        (__VLS_ctx.errors.title);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("date"), ...{ class: ("block text-lg font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("date"), type: ("date"), ...{ class: ("mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, });
    (__VLS_ctx.appointment.date);
    if (__VLS_ctx.errors.date) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-red-500 text-sm mt-2") }, });
        (__VLS_ctx.errors.date);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("time"), ...{ class: ("block text-lg font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center space-x-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("hour"), type: ("number"), min: ("1"), max: ("12"), placeholder: ("HH"), ...{ class: ("mt-2 w-20 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, });
    (__VLS_ctx.appointment.hour);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-3xl font-semibold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("minute"), type: ("number"), min: ("0"), max: ("59"), placeholder: ("MM"), ...{ class: ("mt-2 w-20 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, });
    (__VLS_ctx.appointment.minute);
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.appointment.meridiem)), id: ("meridiem"), ...{ class: ("mt-2 p-4 w-24 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("AM"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("PM"), });
    if (__VLS_ctx.errors.time) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-red-500 text-sm mt-2") }, });
        (__VLS_ctx.errors.time);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center mt-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500") }, });
    __VLS_styleScopedClasses['max-w-2xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mt-12'];
    __VLS_styleScopedClasses['p-8'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow-2xl'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['text-4xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-4'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-20'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-20'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['w-24'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['mt-8'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['hover:bg-blue-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
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
