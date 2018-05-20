let LWWSet = require("./LWWSet.js");

/**
 * Verify elements on the Add Set
 */
test('Add 1 element to Add Set', function () {
    let set = new LWWSet();
    set.add({
        content: "Add Content", createTime: new Date().getTime()
    })

    expect(set.A.length).toBe(1);
    expect(set.R.length).toBe(0);

    expect(set.A[0].content).toBe("Add Content")
})

/**
 * Verify elements on the Remove Set
 */
test('Add 1 element to Remove Set', function () {
    let set = new LWWSet();
    const now = new Date().getTime();
    set.remove({
        content: "Remove Content", createTime: now
    });

    expect(set.A.length).toBe(0);
    expect(set.R.length).toBe(1)

    expect(set.R[0].content).toBe("Remove Content")
})

/**
 * There's only an Add Operation
 * As there are No Remove Operation, the content exists
 */
test("Verify Element Exists - Found 1 Element, When only have Add Operation", function () {
    let set = new LWWSet();
    const now = new Date().getTime();
    const addElement = {
        content: "Element 1", createTime: now
    }
    set.add(addElement)

    expect(set.A.length).toBe(1);
    expect(set.R.length).toBe(0);
    expect(set.query(addElement.content)).toBe(addElement);
})

/**
 * There's an Add Operation followed by a Remove Operation
 * By the definition of the LWW Register, the remove operation wins and the content does not exist in the set
 * 
 * The order follows
 *  Add     : Element 1 
 *  Remove  : Element 1
 */
test("Verify Element Exists - Found Nothing, When an Add Operation is followed by a Remove Operation of the same content", function () {
    let set = new LWWSet();
    const now = new Date().getTime();
    const addElement = {
        content: "Element 1", createTime: now
    }
    const removeElement = {
        content: "Element 1", createTime: now + 1000
    }

    set.add(addElement);
    set.remove(removeElement);

    expect(set.A.length).toBe(1);
    expect(set.R.length).toBe(1);

    expect(set.query(addElement.content)).toBe(null);

})

/**
 * There's only Remove Operation,
 * As there are no add operation, the content does not exist
 */
test("Verify Element Exists - Found Nothing, When only have Remove Operation", function () {
    let set = new LWWSet();
    const now = new Date().getTime();
    const removeElement = {
        content: "Element 1", createTime: now
    }

    set.remove(removeElement);

    expect(set.A.length).toBe(0);
    expect(set.R.length).toBe(1);

    expect(set.query(removeElement.content)).toBe(null);
})

/**
 * When an add operation of the same content has a newer timestamp,
 * It wins over the removal operation
 */
test("Verify Element Exists - Found 1, When Add Operation is having a later timestamp", function () {
    let set = new LWWSet();
    const now = new Date().getTime();

    const removeElement = {
        content: "Element 1", createTime: now + 1000
    }
    const addElement1 = {
        content: "Element 1", createTime: now + 2000
    }


    set.add(addElement1);
    set.remove(removeElement);

    expect(set.A.length).toBe(1);
    expect(set.R.length).toBe(1);

    expect(set.query(addElement1.content)).toBe(addElement1);
})

/**
 * When the same content happens to have Add and Remove Operation at the same time
 * Expecting the element will not be in the set
 * 
 * The order follows
 *  Add: Element 1  &  Remove: Element 1
 */
test("Verify Element Exists - Found Nothing, When Add and Remove Operation happens at the same time", function () {
    let set = new LWWSet();
    const now = new Date().getTime();
    const element = {
        content: "Element", createTime: now
    }

    set.add(element)
    set.remove(element)

    expect(set.A.length).toBe(1);
    expect(set.R.length).toBe(1);

    expect(set.query(element.content)).toBe(null);

})

/**
 * When there is a mix of Add & Remove operation for different content
 * The order follows
 *  Add     : Element 1 
 *  Add     : Element 2
 *  Add     : Element 3
 *  Remove  : Element 3
 * 
 */
test("Verify Multiple Element Exists", function () {
    let set = new LWWSet();
    const now = new Date().getTime();
    const addElement1 = {
        content: "Element 1", createTime: now
    }
    const addElement2 = {
        content: "Element 2", createTime: now + 1000
    }
    const addElement3 = {
        content: "Element 3", createTime: now + 2000
    }
    const removeElement3 = {
        content: "Element 3", createTime: now + 3000
    }

    set.add(addElement1);
    set.add(addElement2);
    set.add(addElement3);
    set.remove(removeElement3);

    expect(set.A.length).toBe(3);
    expect(set.R.length).toBe(1);

    expect(set.query(addElement1.content)).toBe(addElement1);
    expect(set.query(addElement2.content)).toBe(addElement2);
    expect(set.query(removeElement3.content)).toBe(null);
})

/**
 * When there is no element in Add Set / Remove Set,
 * Nothing is return from the query function
 */
test("When Element is Not in Set", function () {
    let set = new LWWSet();
    expect(set.query("Nothing")).toBe(null);
})