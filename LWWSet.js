
/**
 * LWW Element Set
 * LWW Element Set contains of the Add Set (A) and Remove Set (R).
 * Elements added to this Set are inserting to the Add Set or Remove Set based on the Add or Remove Operation
 * 
 * Elements (lwwElement) adding to the Add or Remove Set contains of the content and a timestamp
 * {content: CONTENTS, createTime: CURRENT_TIMESTAMP}
 * 
 * To determine whether an element exist or not, is determined by the function query with the content as the parameter 
 * The following conditions decide whether the element exist
 * 
 * 1. The content is in Add Set (A) and not in Remove Set (R)
 * 2. The content is in Add Set (A) and Remove Set (R), but element in R has an eariler timestamp than in A

 */

const _ = require('lodash');
class LWWSet {
    constructor() {
        this.A = []; //Add Set
        this.R = []; //Remove Set
    }

    //Adding an Add Operation on the Add Set
    add(lwwElement) {

        this.A.push(lwwElement)

        // To sort the element based on the timestamp
        _.sortBy(this.A, ['createTime']);
        // console.log("AddSet", this.A);
    }

    //Adding a Remove Operation on the Remove Set
    remove(lwwElement) {
        this.R.push(lwwElement);

        // To sort the element based on the timestamp
        _.sortBy(this.R, ['createTime']);
        // console.log("RemoveSet", this.R)
    }

    //Query if the given content is in the list
    query(content) {


        const addElement = _.findLast(this.A, (a) => { return content === a.content });
        const removeElement = _.findLast(this.R, (r) => { return content === r.content });

        // console.log(addElement, removeElement)
        //If the element appears in both Add Set and Remove Set
        if (addElement && removeElement) {

            //check the timestamp to see if the addElement has a later timestamp
            if (addElement.createTime > removeElement.createTime) {

                //Element exists
                return addElement;
            } else if (addElement.createTime < removeElement.createTime) {

                //Element not exist, as the removal operation happened later than the add operation
                return null;
            } else {

                //When add operation and remove operation are happened at the same time
                //This is considered that the element does not exist
                return null;
            }
        }

        //When there are only add operation and no removal operation
        else if (addElement && !removeElement) {
            return addElement
        }

        //When there are only remove operation and no add operation
        else if (!addElement && removeElement) {
            return null;
        }

        //When both no add and remove operation
        else {
            return null
        }
    }
}

module.exports = LWWSet;