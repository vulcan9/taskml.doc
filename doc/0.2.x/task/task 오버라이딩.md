
    <task preload="./external.html"></task>


    <task override id="호출">
        <script>
            console.log($args[0] === '타이머');
            $next();
        </script>
        <task override id="조건" if="($args[0] === '타이머')" then="타이머 동작"></task>
    </task>
    <task override id="타이머 동작">
        <script>
            console.log('타이머 동작');
            $next();
        </script>
    </task>
